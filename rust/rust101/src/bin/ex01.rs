// Topic: Use of function to organize code
fn main() {
    print_first_name("palash");
    print_last_name("Kundu");
}

fn print_first_name(first_name: &str) {
    print_console(first_name)
}

fn print_last_name(last_name: &str) {
    print_console(last_name)
}

fn print_console(st: &str) {
    println!("{st}")
}
