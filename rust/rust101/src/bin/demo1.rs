// Topic: Show a countdown using loop keyword

fn main() {
    let mut countdown = 10;

    loop {
        match countdown {
            0 => {
                println!("Done!!!");
                break;
            }
            _ => println!("{countdown:?}"),
        }
        countdown = countdown - 1;
    }
}
