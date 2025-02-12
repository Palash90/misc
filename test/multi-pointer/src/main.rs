use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::{mpsc, Arc, Mutex};
use std::thread;
use std::time::Duration;

fn handle_client(mut stream: TcpStream) {
    println!("Started handling clinet");

    let mut buffer = [0; 512];
    loop {
        match stream.read(&mut buffer) {
            Ok(0) => {
                // Connection was closed
                break;
            }
            Ok(n) => {
                // Echo the message back to the client
                if let Err(e) = stream.write_all(&buffer[0..n]) {
                    eprintln!("Failed to send response: {}", e);
                    break;
                }
            }
            Err(e) => {
                eprintln!("Failed to read from socket: {}", e);
                break;
            }
        }
    }
}

fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:7878")?;
    println!("Server listening on port 7878");

    let req_q = Arc::new(Mutex::new(Vec::<TcpStream>::new()));
    let thread_req_q = req_q.clone();

    let req_handle = thread::spawn(move || {
        for stream in listener.incoming() {
            match stream {
                Ok(stream) => {
                    println!("Connnected");

                    {
                        let thread_req_q = thread_req_q.lock();
                        match thread_req_q {
                            Ok(mut thread_req_q) => {
                                println!("Acquired lock on Arc");
                                thread_req_q.push(stream);
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
    });

    let processor_req_q = req_q.clone();

    let proc_handle = thread::spawn(move || {
        loop {
            {
                let processor_req_q = processor_req_q.lock().unwrap();
                println!("Processing thread acquired mutex lock, number of streams to process {}", processor_req_q.len());

                for mut req in processor_req_q.iter() {
                    let mut r = [0u8; 512];
                    req.read(&mut r);
    
                    println!("{:?}", String::from_utf8_lossy(&r));
    
                  //  req.write_all(&r);
    
                  //  req.flush();
                }
            }
            println!("Processing thread going to sleep \n");
            thread::sleep(Duration::from_millis(10));
        }
    });

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
