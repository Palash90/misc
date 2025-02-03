use std::io::{self, Read, Write};
use std::net::TcpStream;

fn main() -> io::Result<()> {
    // Connect to the server
    let mut stream = TcpStream::connect("127.0.0.1:7878")?;

    

    loop {
        let mut input = String::new();
        print!("mem-db$: ");
        io::stdout().flush();
        
        io::stdin()
            .read_line(&mut input)
            .expect("Failed to read line");

        if input.trim().eq("quit") {
            println!("Good Bye");
            break;
        }

        stream.write_all(input.as_bytes())?;

        // Read the response from the server
        let mut buffer = [0; 512];
        let n = stream.read(&mut buffer)?;
        println!("Received: {}", String::from_utf8_lossy(&buffer[..n]));
    }

    Ok(())
}
