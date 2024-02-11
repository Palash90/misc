use std::io;

fn main() {
    let mut input: String = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");
    let input:i32 = input.trim().parse().expect("Please type a number!");
    let mut z = 0;
    z = 34;
    let r = 10 / z;
    

    println!("{} {} {}","PALaSH".to_lowercase(), "totan".to_uppercase(), r)
}