#!/usr/bin/env python3
import http.server, json, os, uuid, base64, mimetypes, requests, subprocess, time, random, threading, sys
from datetime import datetime
from urllib.parse import urlparse, parse_qs

LLAMA_BASE = "http://localhost:8081"
LLAMA_URL = f"{LLAMA_BASE}/v1/chat/completions"

SEARXNG_URL = "http://localhost:8080/search"
COMFYUI_URL = "http://localhost:8188"
HOST, PORT = "0.0.0.0", 9000

with open(os.path.expanduser("~/local-ai-files/model.txt"), "r") as file:
    MODEL_ID = file.read()

COMFYUI_OUTPUT = os.path.expanduser("~/local-ai-files/ComfyUI/output")
SESSIONS_FILE = os.path.expanduser("~/local-ai-files/sessions.json")
IMG_PATH = os.path.expanduser("~/local-ai-files/ComfyUI/output")
PROMPT_PATH = os.path.expanduser("~/local-ai-files/sys_prompt.txt")

IMAGE_MODELS = {
    "sd3_5_medium": {
        "unet": "sd3.5_medium-Q4_K_M.gguf",
        "clip1": "clip_l.safetensors",
        "clip2": "clip_g.safetensors",
        "t5": "t5-v1_1-xxl-encoder-Q4_K_M.gguf",
        "vae": "sd3_vae.safetensors",
        "description": "High-quality Stable Diffusion 3.5 Medium. Can draw or generate any kind of photo. High Quality but Slow.",
    },
    "realistic": {
        "ckpt": "Realistic_Vision_V6.0_NV_B1_fp16.safetensors",
        "vae": "vae-ft-mse-840000-ema-pruned.safetensors",
        "description": "Hyper-realistic photos and lifelike images. Moderately fast but not the best quality.",
    },
    "sketch": {
        "ckpt": "dreamshaper_8.safetensors",
        "vae": "vae-ft-mse-840000-ema-pruned.safetensors",
        "description": "Pencil sketches, line art, and artistic drawings (prompt with 'pencil sketch'). Fast and good.",
    },
    "ghibli": {
        "ckpt": "ghibli_diffusion_v1.ckpt",
        "vae": "vae-ft-mse-840000-ema-pruned.safetensors",
        "description": "Studio Ghibli style anime illustrations (prompt with 'ghibli style'). Fast but not the best.",
    },
}

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": "Search the web for real-time/current information. Use this for weather, news, sports, stock prices, recent events, or any query where up-to-date data matters. Do NOT answer time-sensitive questions from memory — always search.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "The search query"}
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "generate_image",
            "description": "Generate or draw an image. You MUST choose a style model.",
            "parameters": {
                "type": "object",
                "properties": {
                    "prompt": {
                        "type": "string",
                        "description": "Detailed visual description of what to draw/generate.",
                    },
                    "negative_prompt": {
                        "type": "string",
                        "description": "Things to avoid in the image",
                    },
                    "model": {
                        "type": "string",
                        "enum": list(IMAGE_MODELS.keys()),
                        "description": "Art style to use. Options: "
                        + ", ".join(
                            [
                                f"'{k}' ({v['description']})"
                                for k, v in IMAGE_MODELS.items()
                            ]
                        ),
                    },
                },
                "required": ["prompt", "model"],
            },
        },
    },
]


with open(PROMPT_PATH, "r") as file:
    SYS_CONTENT = file.read()
model_list = "; ".join(f"{k}: {v['description']}" for k, v in IMAGE_MODELS.items())
SYS_CONTENT = SYS_CONTENT.replace("%model_list%", model_list)
SYS_CONTENT = SYS_CONTENT.replace("%_image_keys%", str(list(IMAGE_MODELS.keys())))

print("Prompt:\n", "*" * 80, "\n", SYS_CONTENT, "\n", "*" * 80)

sessions = {}
sessions_meta = {}
tasks = {}
model_status = "unloaded"
_last_tps = None
_last_llm_use = time.time()

MAX_QUEUE_SIZE = 5
_task_queue = []
_queue_lock = threading.Lock()
_queue_cond = threading.Condition(_queue_lock)
_current_task_id = None

MAX_INPUT_TOKENS = 3000

_location_cache = None


def load_sessions():
    global sessions, sessions_meta
    try:
        with open(SESSIONS_FILE) as f:
            data = json.load(f)
        sessions = {}
        sessions_meta = {}
        for sid, sdata in data.get("sessions", {}).items():
            sessions[sid] = sdata.get("messages", [])
            sessions_meta[sid] = {
                "name": sdata.get("name", "Chat"),
                "created": sdata.get("created", time.time()),
                "updated": sdata.get("updated", time.time()),
            }
    except (FileNotFoundError, json.JSONDecodeError):
        sessions = {}
        sessions_meta = {}


def save_sessions():
    data = {"sessions": {}}
    for sid in sessions:
        meta = sessions_meta.get(
            sid, {"name": "Chat", "created": time.time(), "updated": time.time()}
        )
        data["sessions"][sid] = {
            "name": meta["name"],
            "created": meta["created"],
            "updated": meta["updated"],
            "messages": sessions[sid],
        }
    with open(SESSIONS_FILE, "w") as f:
        json.dump(data, f, indent=2)


def estimate_tokens(messages):
    total_chars = 0
    for msg in messages:
        content = msg.get("content", "")
        if isinstance(content, str):
            total_chars += len(content)
        elif isinstance(content, list):
            for part in content:
                if isinstance(part, dict) and part.get("type") == "text":
                    total_chars += len(part.get("text", ""))
    return max(1, total_chars // 4)


def trim_messages_for_context(messages):
    trimmed = list(messages)
    while estimate_tokens(trimmed) > MAX_INPUT_TOKENS and len(trimmed) > 1:
        trimmed.pop(0)
    return trimmed


def set_status(task_id, message):
    if task_id in tasks:
        tasks[task_id]["status"] = "working"
        tasks[task_id]["message"] = message


def is_llama_alive():
    try:
        r = requests.get(f"{LLAMA_BASE}/health", timeout=5)
        return r.status_code == 200
    except:
        return False


def unload_llama_model():
    global model_status
    model_status = "unloading"
    print("[llama] Requesting model unload from VRAM...")
    try:
        r = requests.post(
            f"{LLAMA_BASE}/models/unload", json={"model": MODEL_ID}, timeout=30
        )
        if r.status_code == 200:
            print("[llama] Model unloaded")
            model_status = "unloaded"
            return True
        print(f"[llama] Unload response: {r.status_code} {r.text[:200]}")
    except Exception as e:
        print(f"[llama] Unload error: {e}")
    model_status = "unloaded"
    return False


def load_llama_model():
    global model_status
    model_status = "loading"
    print(f"[llama] Sending load request for model '{MODEL_ID}'...")
    try:
        r = requests.post(
            f"{LLAMA_BASE}/models/load", json={"model": MODEL_ID}, timeout=180
        )
        if r.status_code in (200, 201):
            for i in range(30):
                if is_llama_alive():
                    print(f"[llama] Model ready (attempt {i+1})")
                    model_status = "chat_loaded"
                    return True
                time.sleep(2)
        else:
            print(f"[llama] Load failed ({r.status_code}): {r.text[:200]}")
    except Exception as e:
        print(f"[llama] Load exception: {e}")

    # Fallback check: verify if the server is alive and responding anyway
    if is_llama_alive():
        model_status = "chat_loaded"
        return True

    model_status = "unloaded"
    return False


def free_comfyui_vram():
    print("[comfyui] Freeing VRAM...")
    try:
        r = requests.post(
            f"{COMFYUI_URL}/free",
            json={"unload_models": True, "free_memory": True},
            timeout=30,
        )
        if r.status_code == 200:
            print("[comfyui] VRAM freed")
            return True
    except Exception as e:
        print(f"[comfyui] Free error: {e}")
    return False


def get_location():
    global _location_cache
    if _location_cache is None:
        try:
            _location_cache = requests.get("http://ip-api.com/json/", timeout=5).json()
        except:
            _location_cache = {"city": "", "regionName": "", "country": ""}
    return _location_cache


def location_str():
    loc = get_location()
    parts = [loc.get("city"), loc.get("regionName"), loc.get("country")]
    return ", ".join(p for p in parts if p) or "Unknown"


def web_search(query):
    loc_str = location_str()
    ctx = f"[Date: {datetime.now().strftime('%Y-%m-%d %A')}] [Location: {loc_str}] {query}"
    from urllib.parse import urlencode

    search_url = SEARXNG_URL + "?" + urlencode({"q": ctx, "format": "json"})
    print("Performing web search", search_url)
    r = requests.get(SEARXNG_URL, params={"q": ctx, "format": "json"}, timeout=10)
    data = r.json()
    results = data.get("results", [])[:5]
    formatted = []
    for x in results:
        formatted.append(
            {
                "title": x.get("title", ""),
                "url": x.get("url", ""),
                "snippet": x.get("content", "") or x.get("snippet", ""),
            }
        )
    return json.dumps(
        {
            "results": formatted,
            "search_date": datetime.now().strftime("%Y-%m-%d %A"),
            "query": query,
            "search_url": search_url,
        }
    )


def generate_image(prompt, task_id, negative_prompt="", model="sd3_5_medium"):
    global model_status
    print(f"\n[image] Generating image for task {task_id} with the prompt: {prompt}")
    set_status(task_id, "Freeing VRAM for image generation...")
    unload_llama_model()

    gen_tag = str(uuid.uuid4())[:8]
    prefix = f"gen_{gen_tag}_"
    cfg = IMAGE_MODELS.get(model, IMAGE_MODELS["sd3_5_medium"])

    if model == "sd3_5_medium":
        print("Chose SD 3.5 for image generation")
        workflow = {
            "1": {"class_type": "UnetLoaderGGUF", "inputs": {"unet_name": cfg["unet"]}},
            "2": {
                "class_type": "TripleCLIPLoaderGGUF",
                "inputs": {
                    "clip_name1": cfg["clip1"],
                    "clip_name2": cfg["clip2"],
                    "clip_name3": cfg["t5"],
                    "type": "sd3",
                },
            },
            "3": {
                "class_type": "CLIPTextEncode",
                "inputs": {"text": prompt, "clip": ["2", 0]},
            },
            "4": {
                "class_type": "CLIPTextEncode",
                "inputs": {"text": negative_prompt, "clip": ["2", 0]},
            },
            "5": {
                "class_type": "EmptySD3LatentImage",
                "inputs": {"width": 1024, "height": 1024, "batch_size": 1},
            },
            "6": {
                "class_type": "KSampler",
                "inputs": {
                    "seed": random.randint(0, 2**31),
                    "steps": 20,  # Recommended steps for SD 3.5 Medium
                    "cfg": 4.5,  # Recommended CFG range for SD 3.5 Medium: 3.5 to 5.0
                    "sampler_name": "euler",
                    "scheduler": "sgm_uniform",
                    "denoise": 1.0,
                    "model": ["1", 0],
                    "positive": ["3", 0],
                    "negative": ["4", 0],
                    "latent_image": ["5", 0],
                },
            },
            "7": {"class_type": "VAELoader", "inputs": {"vae_name": cfg["vae"]}},
            "8": {
                "class_type": "VAEDecode",
                "inputs": {"samples": ["6", 0], "vae": ["7", 0]},
            },
            "9": {
                "class_type": "SaveImage",
                "inputs": {"filename_prefix": prefix, "images": ["8", 0]},
            },
        }
    else:
        workflow = {
            "3": {
                "class_type": "KSampler",
                "inputs": {
                    "seed": random.randint(0, 2**31),
                    "steps": 20,
                    "cfg": 7,
                    "sampler_name": "euler",
                    "scheduler": "normal",
                    "denoise": 1,
                    "model": ["4", 0],
                    "positive": ["6", 0],
                    "negative": ["7", 0],
                    "latent_image": ["5", 0],
                },
            },
            "4": {
                "class_type": "CheckpointLoaderSimple",
                "inputs": {"ckpt_name": cfg["ckpt"]},
            },
            "5": {
                "class_type": "EmptyLatentImage",
                "inputs": {"width": 512, "height": 512, "batch_size": 1},
            },
            "6": {
                "class_type": "CLIPTextEncode",
                "inputs": {"text": prompt, "clip": ["4", 1]},
            },
            "7": {
                "class_type": "CLIPTextEncode",
                "inputs": {"text": negative_prompt, "clip": ["4", 1]},
            },
            "8": {
                "class_type": "VAEDecode",
                "inputs": {"samples": ["3", 0], "vae": ["10", 0]},
            },
            "9": {
                "class_type": "SaveImage",
                "inputs": {"filename_prefix": prefix, "images": ["8", 0]},
            },
            "10": {"class_type": "VAELoader", "inputs": {"vae_name": cfg["vae"]}},
        }

    model_status = "image_active"
    tasks[task_id]["gen_prompt"] = prompt
    tasks[task_id]["_image_model"] = model
    tasks[task_id]["negative_prompt"] = negative_prompt
    p_short = prompt[:200] + ("..." if len(prompt) > 200 else "")
    set_status(task_id, f"Generating image with ComfyUI... Prompt: {p_short}")
    try:
        r = requests.post(
            f"{COMFYUI_URL}/prompt", json={"prompt": workflow}, timeout=120
        )
        data = r.json()

        if "error" in data:
            result = json.dumps({"error": f"ComfyUI: {data['error']}"})
        else:
            prompt_id = data["prompt_id"]
            found_file = None
            for _ in range(120):
                time.sleep(1)
                try:
                    hr = requests.get(f"{COMFYUI_URL}/history/{prompt_id}", timeout=10)
                    hist = hr.json()

                    if prompt_id in hist:
                        outputs = hist[prompt_id].get("outputs", {})
                        for node_id, node_out in outputs.items():
                            for img in node_out.get("images", []):
                                fname = img["filename"]
                                fpath = os.path.join(IMG_PATH, fname)
                                found_file = fpath
                                break
                        if found_file:
                            break
                except Exception:
                    pass
            if found_file:
                tasks[task_id]["image_file"] = found_file
                set_status(task_id, f"Image saved as {found_file}")
                result = json.dumps({"prompt_id": prompt_id, "file": found_file})
            else:
                result = json.dumps({"error": "Image generation timeout"})
    except Exception as e:
        result = json.dumps({"error": str(e)})
    finally:
        set_status(task_id, "Freeing image generation VRAM...")
        free_comfyui_vram()
        set_status(task_id, "Loading chat model...")
        load_llama_model()
    return result


def process_task(task_id, sid, user_message, image_b64):
    # Prepare system context string
    date_loc_context = f"[Current date: {datetime.now().strftime('%Y-%m-%d %A %H:%M')}] [User location: {location_str()}]"
    full_sys_content = f"{SYS_CONTENT}\n\n{date_loc_context}"

    # Ensure system message is properly maintained at index 0
    if sid not in sessions or not sessions[sid]:
        sessions[sid] = [{"role": "system", "content": full_sys_content}]
    elif sessions[sid][0].get("role") == "system":
        sessions[sid][0]["content"] = full_sys_content
    else:
        sessions[sid].insert(0, {"role": "system", "content": full_sys_content})

    if sid not in sessions_meta:
        sessions_meta[sid] = {
            "name": user_message[:50],
            "created": time.time(),
            "updated": time.time(),
        }

    content = []
    if image_b64:
        content.append(
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{image_b64}"},
            }
        )
    content.append({"type": "text", "text": user_message})
    sessions[sid].append({"role": "user", "content": content})

    if sessions_meta[sid]["name"] in ("New Chat", ""):
        sessions_meta[sid]["name"] = user_message[:50] + (
            "..." if len(user_message) > 50 else ""
        )
    sessions_meta[sid]["updated"] = time.time()
    save_sessions()

    if model_status != "chat_loaded":
        load_llama_model()

    max_tool_rounds = 10
    for _round in range(max_tool_rounds):
        # Simply trim the session history — index 0 remains the single system message
        messages = trim_messages_for_context(sessions[sid])

        payload = {
            "model": MODEL_ID,
            "messages": messages,
            "tools": TOOLS,
            "tool_choice": "auto",
            "max_tokens": 4096,
        }

        for attempt in range(3):
            try:
                r = requests.post(LLAMA_URL, json=payload, timeout=180)
                body = r.json()
                if "choices" in body:
                    msg = body["choices"][0]["message"]
                    global _last_llm_use
                    _last_llm_use = time.time()
                    break
                if attempt < 2:
                    time.sleep(3)
                    continue
                tasks[task_id] = {
                    "status": "error",
                    "error": f"Unexpected response ({r.status_code}): {str(body)[:300]}",
                    "session_id": sid,
                }
                return
            except Exception as e:
                if attempt < 2:
                    time.sleep(3)
                    continue
                tasks[task_id] = {"status": "error", "error": str(e), "session_id": sid}
                return

        if msg.get("tool_calls"):
            if "_tools_used" not in tasks[task_id]:
                tasks[task_id]["_tools_used"] = []
            if "_search_details" not in tasks[task_id]:
                tasks[task_id]["_search_details"] = []

            for tc in msg["tool_calls"]:
                tool_name = tc["function"]["name"]
                args = json.loads(tc["function"]["arguments"])

                if tool_name not in tasks[task_id]["_tools_used"]:
                    tasks[task_id]["_tools_used"].append(tool_name)

                if tool_name == "web_search":
                    set_status(task_id, f"Searching web for: {args.get('query')}...")
                    result = web_search(args["query"])
                    try:
                        tasks[task_id]["_search_details"].append(json.loads(result))
                    except:
                        pass
                elif tool_name == "generate_image":
                    result = generate_image(
                                prompt=args["prompt"],
                                task_id=task_id,
                                negative_prompt=args.get("negative_prompt", ""),
                                model=args.get("model") or "sd3_5_medium",
                            )

                sessions[sid].append(
                    {"role": "tool", "tool_call_id": tc["id"], "content": result}
                )
                sessions_meta[sid]["updated"] = time.time()
                save_sessions()
        else:
            tools_used = list(tasks[task_id].get("_tools_used", []))
            search_details = list(tasks[task_id].get("_search_details", []))

            # Format image path for UI if generated
            image_filename = tasks[task_id].get("image_file")
            image_url = f"/output/{image_filename}" if image_filename else None
            gen_prompt = tasks[task_id].get("gen_prompt")
            image_model = tasks[task_id].get("_image_model")

            msg_entry = {
                "role": "assistant",
                "content": msg["content"],
                "_tools_used": tools_used,
                "_image_url": image_url,
                "_gen_prompt": gen_prompt,
                "_image_model": image_model,
                "_search_details": search_details,
            }
            sessions[sid].append(msg_entry)
            sessions_meta[sid]["updated"] = time.time()
            save_sessions()

            timings = body.get("timings", {})
            predicted_per_second = timings.get("predicted_per_second")
            global _last_tps
            _last_tps = predicted_per_second

            # Return complete dictionary to frontend
            tasks[task_id] = {
                "status": "done",
                "response": msg["content"],
                "session_id": sid,
                "token_estimate": estimate_tokens(sessions[sid]),
                "predicted_per_second": predicted_per_second,
                "tools_used": tools_used,
                "image": image_url,
                "_image_url": image_url,
                "gen_prompt": gen_prompt,
                "_image_model": image_model,
                "_search_details": search_details,
            }
            return

    # Max tool rounds exhausted without a final text response
    tasks[task_id] = {
        "status": "error",
        "error": "Image generation loop exceeded maximum iterations. Please try again with a simpler request.",
        "session_id": sid,
    }


def _queue_worker():
    global _current_task_id
    while True:
        item = None
        with _queue_lock:
            while not _task_queue:
                _queue_cond.wait()
            item = _task_queue.pop(0)
            _current_task_id = item["task_id"]
        try:
            process_task(
                item["task_id"], item["session_id"], item["message"], item["image"]
            )
        except Exception:
            if item["task_id"] in tasks:
                tasks[item["task_id"]] = {
                    "status": "error",
                    "error": "Internal server error",
                    "session_id": item["session_id"],
                }
        finally:
            with _queue_lock:
                _current_task_id = None
                _queue_cond.notify_all()


def _idle_unload_loop():
    global _last_llm_use
    while True:
        time.sleep(10)
        if model_status == "chat_loaded" and time.time() - _last_llm_use > 300:
            print("[idle] No LLM activity for 300s, releasing VRAM model weights...")
            unload_llama_model()


HTML_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html")
try:
    with open(HTML_FILE) as f:
        HTML = f.read()
except:
    HTML = "<html><body><h1>index.html missing</h1></body></html>"


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/model-status":
            self.send_json({"model": model_status, "predicted_per_second": _last_tps})
        elif self.path.startswith("/output/"):
            fpath = os.path.join(COMFYUI_OUTPUT, os.path.basename(self.path))
            if os.path.exists(fpath):
                self.send_response(200)
                self.send_header("Content-Type", "image/png")
                self.end_headers()
                with open(fpath, "rb") as f:
                    self.wfile.write(f.read())
                return
            self.send_error(404)
        elif self.path.startswith("/api/status/"):
            task_id = os.path.basename(self.path)
            self.send_json(
                tasks.get(task_id, {"status": "unknown", "message": "Not found"})
            )
        elif self.path == "/api/sessions":
            sorted_items = sorted(
                sessions_meta.items(),
                key=lambda x: x[1].get("updated", 0),
                reverse=True,
            )
            result = [
                {
                    "session_id": sid,
                    "name": meta.get("name", "Chat"),
                    "created": meta.get("created", 0),
                    "updated": meta.get("updated", 0),
                    "token_estimate": estimate_tokens(sessions.get(sid, [])),
                }
                for sid, meta in sorted_items
            ]
            self.send_json(result)
        elif self.path.startswith("/api/sessions/") and self.path.endswith("/messages"):
            sid = self.path.split("/")[3]
            if sid in sessions:
                self.send_json(
                    {
                        "messages": sessions[sid],
                        "token_estimate": estimate_tokens(sessions[sid]),
                    }
                )
            else:
                self.send_error(404)
        elif self.path == "/":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(HTML.encode())
        else:
            self.send_error(404)

    def do_DELETE(self):
        if self.path.startswith("/api/sessions/"):
            sid = self.path.split("/")[3]
            if sid in sessions:
                sessions.pop(sid, None)
                sessions_meta.pop(sid, None)
                save_sessions()
                self.send_json({"status": "deleted"})
            else:
                self.send_error(404)
        else:
            self.send_error(404)

    def do_PUT(self):
        if self.path.startswith("/api/sessions/"):
            sid = self.path.split("/")[3]
            if sid in sessions_meta:
                length = int(self.headers.get("Content-Length", 0))
                body = json.loads(self.rfile.read(length))
                sessions_meta[sid]["name"] = body.get(
                    "name", sessions_meta[sid]["name"]
                )
                sessions_meta[sid]["updated"] = time.time()
                save_sessions()
                self.send_json({"status": "updated"})
            else:
                self.send_error(404)
        else:
            self.send_error(404)

    def do_POST(self):
        if self.path == "/api/chat":
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))
            task_id = str(uuid.uuid4())
            sid = body.get("session_id", "default")
            entry = {
                "task_id": task_id,
                "session_id": sid,
                "message": body.get("message", ""),
                "image": body.get("image"),
            }
            with _queue_lock:
                if len(_task_queue) >= MAX_QUEUE_SIZE:
                    self.send_json({"error": "Server busy"}, status=503)
                    return
                _task_queue.append(entry)
                _queue_cond.notify()
            tasks[task_id] = {
                "status": "queued",
                "message": "Waiting in line...",
                "session_id": sid,
            }
            self.send_json({"task_id": task_id})
        elif self.path == "/api/sessions":
            sid = str(uuid.uuid4())
            now = time.time()
            sessions[sid] = []
            sessions_meta[sid] = {"name": "New Chat", "created": now, "updated": now}
            save_sessions()
            self.send_json({"session_id": sid})
        else:
            self.send_error(404)

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    load_sessions()
    threading.Thread(target=_queue_worker, daemon=True).start()
    threading.Thread(target=_idle_unload_loop, daemon=True).start()
    print(f"Chat UI running on http://localhost:{PORT}")
    s = http.server.HTTPServer((HOST, PORT), Handler)
    try:
        s.serve_forever()
    except KeyboardInterrupt:
        s.shutdown()
