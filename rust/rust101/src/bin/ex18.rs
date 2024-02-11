#[derive(Debug)]
struct Adult {
    name: String,
    age: i32
}

impl Adult  {
    fn new(name: String, age: i32) -> Result<Adult, String> {
        match age {
            1..=18 => Err(format!("Minimum age required is 18, got age {}", age).to_owned()),
            _ => Ok(Adult{name: name, age: age})
        }
    }
}

fn main() {
    let adult = Adult::new("Palash".to_owned(), 33);
    let child = Adult::new("Prapti".to_owned(), 7);

    println!("{:?}", adult);
    println!("{:?}", child)
}