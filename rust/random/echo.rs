use std::io;

fn main(){
    let mut input = String::new();
    io::stdin().read_line(&mut input);
    println!("{input}");

    let number: i32 = input.trim().parse().unwrap();

    println!("{}", number+1);
}
