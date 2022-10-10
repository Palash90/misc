use rand::prelude::*;
use std::io;

fn main() {
    let number: i32 = thread_rng().gen_range(1..100);
    let mut guesses: i32 = 0;

    loop {
        println!("Enter your guess");

        let mut input = String::new();
        io::stdin().read_line(&mut input);
        let guess:i32 = input.trim().parse().unwrap();
        guesses += 1;

        if guess == number{
            println!("You win in {guesses} guesses!!!");
            break;
        }

        if guess < number {
            println!("Too low!!!");
        }

        if guess> number{
            println!("Too High"); 
        }
    }
}
