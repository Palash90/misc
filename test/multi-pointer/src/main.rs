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
            let mut i = 0;
            while i < queue.len() {
                let mut req = queue.pop_front().unwrap();
                let mut buffer = [0u8; 512];

                match req.read(&mut buffer) {
                    Ok(0) => {
                        // Client disconnected, drop the stream
                        println!("Client disconnected, removing stream");
                    }
                    Ok(n) => {
                        let mut op = String::from_utf8_lossy(&buffer[..n]).into_owned();
                        op = op.trim().into();
                        println!("Received: {:?}", op);

                        if op.eq("async") {
                            println!("Running long loop");
                            let mut i = 0_u64;
                            while i < 100_000_000_00 {
                                i = i + 1
                            }
                        }

                        println!("Sending back {}", op);

                        req.write_all(&buffer[..n]).unwrap();
                        req.flush().unwrap();
                        queue.push_back(req); // Reinsert active streams
                    }
                    Err(ref e) if e.kind() == std::io::ErrorKind::WouldBlock => {
                        // No data available, reinsert stream
                        queue.push_back(req);
                    }
                    Err(e) => {
                        // Some other error occurred, drop the connection
                        println!("Error reading from stream: {:?}", e);
                    }
                }
                i += 1;
            }
        }
        thread::sleep(Duration::from_nanos(10));
    }
}

fn handle_incoming_requests(listener: TcpListener, thread_req_q: Arc<Mutex<VecDeque<TcpStream>>>) {
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                println!("Connnected");
                stream
                    .set_nonblocking(true)
                    .expect("Failed to set non-blocking mode");

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
