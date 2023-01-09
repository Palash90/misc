use std::io;
use rand::Rng;
use std::cmp::Ordering;

fn main() {
    println!("Guess the number!");
    
    let secret_number = rand::thread_rng().gen_range(1..=100);
    println!("Generated guess is {}", secret_number);

    
    loop {
        println!("Please input your guess.");
        
        let mut guess = String::new();
        io::stdin().read_line(&mut guess).expect("Failed to read line");
        let guess: u32 = guess.trim().parse().expect("Please input a different number");

        println!("You guessed: {}", guess);
    
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too Low"),
            Ordering::Greater => println!("Too High"),
            Ordering::Equal => {
                 println!("You win");
                 break;
            }
        }
    }
}
