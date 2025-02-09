use std::net::TcpListener;
use std::sync::mpsc;
use std::thread;
use std::io::BufReader;
use std::io::BufRead;

fn main() {
    let (req_tx, req_rx) = mpsc::channel();

    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        let buf_reader = BufReader::new(&stream);
        let http_request: Vec<_> = buf_reader
            .lines()
            .map(|result| result.unwrap())
            .take_while(|line| !line.is_empty())
            .collect();

        println!("Request: {http_request:#?}");

        req_tx.send(http_request).unwrap();
    }

    for received in req_rx {
        println!("Got: {received:#?}");
    }
}
