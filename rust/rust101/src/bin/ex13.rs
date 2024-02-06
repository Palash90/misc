fn main() {
    let v = vec![10, 20, 30, 40];

    for value in &v {
        match value {
            30 => {
                println!("Thirty");
            }
            _ => {
                println!("{}", value);
            }
        }
    }
    println!("Total numbers in collection {}", v.len());
}
