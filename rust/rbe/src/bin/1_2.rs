#[derive(Debug)]
struct Strct(i32);

fn main() {
    println!("{0} this is {1}, {1} this is {0}", "Bob", "Alice");
    println!(
        "{borrower} borrowed money from {lender}",
        lender = "Palash",
        borrower = "Totan"
    );
    println!(
        "Decimal {}, Binary {:b}, Octal {:o}, Hexadecimal {:x}",
        16, 16, 16, 16
    );
    println!("Pad 5 {number:0>5}", number = 123);
    println!("Reverse Pad 7 {number:_<7}", number = 123.1);
    println!("{number:0>width$}", number = 1, width = 5);
    println!(
        "I am {1}, {0} {1}",
        "Palash", /*Comment the next part to see the error */ "Kundu"
    );
    let st = Strct(32);
    println!("{:#?}", st);

    let pi = 3.141592;
    println!("Pi approximated as {:.3}", pi);
}
