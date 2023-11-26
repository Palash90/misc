// Topic: Count down 5 to 1 with loops and without using break.

fn main() {
    let mut counter = 5;

    while counter > 0 {
        println!("{counter}");
        counter = counter - 1;
    }
    println!("Done!");
}
