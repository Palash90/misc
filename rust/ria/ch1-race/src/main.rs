use std::thread;

fn main() {
    let mut data = "Main";

    thread::spawn(move||{data = "Thread 1"; println!("data in thread 1 {}", data);});
    thread::spawn(move||{data = "Thread 2";println!("data in thread 2 {}", data);});
    println!("data in main {}", data);
}
