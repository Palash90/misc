fn main() {
    let sum = add(2, 5);
    display(sum);
    let sum = add(2, 6);
    display(sum);
    let sum = add(2, 9);
    display(sum);

}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn display(number: i32) {
    println!("{number:?}")
}