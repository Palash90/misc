use std::collections::VecDeque;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:7878")?;
    println!("Server listening on port 7878");

    let req_q = Arc::new(Mutex::new(VecDeque::<TcpStream>::new()));
    let thread_req_q = req_q.clone();

    let req_handle = thread::spawn(move || handle_incoming_requests(listener, thread_req_q));

    let processor_req_q = req_q.clone();

    let proc_handle = thread::spawn(move || process_request(processor_req_q));

    match req_handle.join() {
        Ok(_) => println!("Main thread waiting for request thread to stop"),
        Err(_) => println!("Main thread error while waiting for request thread"),
    }
    match proc_handle.join() {
        Ok(_) => println!("Main thread waiting for Processing thread to stop"),
        Err(_) => println!("Main thread error while waiting for Processing thread"),
    }

    Ok(())
}

fn process_request(processor_req_q: Arc<Mutex<VecDeque<TcpStream>>>) -> ! {
    loop {
        {
            let mut queue = processor_req_q.lock().unwrap();
            println!(
                "Processing thread acquired mutex lock, number of streams to process {}",
                queue.len()
            );

            while let Some(mut req) = queue.pop_front() {
                let mut r = [0u8; 512];
                match req.read(&mut r) {
                    Ok(0) => {
                        // Client disconnected
                        println!("Client disconnected, removing stream");
                    }
                    Ok(n) => {
                        println!("{:?}", String::from_utf8_lossy(&r[..n]));
                        req.write_all(&r[..n]).unwrap();
                        req.flush().unwrap();
                        queue.push_back(req); // Put back into queue if still active
                    }
                    Err(_) => {
                        // Error means stream is not ready yet, put it back
                        queue.push_back(req);
                    }
                }
            }
        }
        println!("Processing thread going to sleep \n");
        thread::sleep(Duration::from_millis(10));
    }
}

fn handle_incoming_requests(listener: TcpListener, thread_req_q: Arc<Mutex<VecDeque<TcpStream>>>) {
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                println!("Connnected");

                {
                    let thread_req_q = thread_req_q.lock();
                    match thread_req_q {
                        Ok(mut thread_req_q) => {
                            println!("Acquired lock on Arc");
                            thread_req_q.push_back(stream);
                        }
                        Err(e) => println!("Error acquiring lock: {:?}", e),
                    }
                }
            }
            Err(e) => {
                eprintln!("Failed to accept connection: {}", e);
            }
        }
    }
}
