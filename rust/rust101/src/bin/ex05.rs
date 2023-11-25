//  Topic: Print 1 to 4 using loop

fn main() {
    let mut counter = 1;
    loop {
        println!("{counter}");
        counter = counter + 1;
        if counter == 5 {
            break;
        }
    }
}