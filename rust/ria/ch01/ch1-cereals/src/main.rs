#[derive(Debug)]
enum Cereal {
    Barley, Millet, Rice, Rye, Spelt, Wheat
}
fn main() {
    let mut grain: Vec<Cereal> = vec![];
    grain.push(Cereal::Rye);
  //  drop(grain);
    println!("{:?}", grain);
}
