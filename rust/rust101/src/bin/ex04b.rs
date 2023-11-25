// Topic: match with catch all
fn main() {
    for i in 0..5 {
        match i {
            1 => println!("one"),
            2 => println!("two"),
            3 => println!("three"),
            _ => println!("value out of bounds"),
        }
    }
}
