use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::thread;

fn handle_client(mut stream: TcpStream) {
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

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                println!("Connnected");
                thread::spawn(|| {
                    handle_client(stream);
                });
            }
            Err(e) => {
                eprintln!("Failed to accept connection: {}", e);
            }
        }
    }

    Ok(())
}
