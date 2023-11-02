fn main() {
    // This program will fail in release mode due to integer overflow.
    for i in 1..16 { 
        print!("i is {i}\n");
        find(i);
    }
}

fn find(input: i8) {
    let mut x = input; // Mutable variable binding
    print!("{x}"); // Macro for printing, like printf
    while x != 1 {
        // No parenthesis around expression
        if x % 2 == 0 {
            // Math like in other languages
            x = x / 2;
        } else {
            x = 3 * x + 1;
        }
        print!(" -> {}", x);
    }
    println!();
    println!();
}
