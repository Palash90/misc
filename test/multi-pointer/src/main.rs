use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::mpsc;
use std::thread;

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

    let (req_tx, req_rx) = mpsc::channel();

    let req_handle = thread::spawn(move || {
        for stream in listener.incoming() {
            match stream {
                Ok(stream) => {
                    println!("Connnected");

                    match req_tx.send(|| handle_client(stream)) {
                        Ok(_) => println!("Stream successfully sent in request queue"),
                        Err(e) => println!("{e}"),
                    }
                }
                Err(e) => {
                    eprintln!("Failed to accept connection: {}", e);
                }
            }
        }
    });

    let proc_handle = thread::spawn(move || {
        for received in req_rx {
            println!("Request queue");
            received()
        }
    });


    match req_handle.join() {
        Ok(_) => println!("Main thread waiting for request thread to stop"),
        Err(_) => println!("Main thread error while waiting for request thread")
    }
    match proc_handle.join() {
        Ok(_) => println!("Main thread waiting for Processing thread to stop"),
        Err(_) => println!("Main thread error while waiting for Processing thread")
    }

    Ok(())
}
