// Topic: Check if mutable borrow after normal borrow works or not

struct Test {
    st: String,
}

fn main() {
    let mut test = Test {
        st: String::from(""),
    };
    display(&test);
    change(&mut test);
    display(&test);
}

fn display(test: &Test) {
    println!("{:?}", test.st)
}

fn change(test: &mut Test) {
    test.st = String::from("Hello");
}
