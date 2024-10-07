// This is impossible to achieve in Rust due to its ownership rules
fn main() {
    let mut letters = vec!['a', 'b', 'c']; // This creates a growable list, similar to List or ArrayList

    for letter in letters {
        println!("{}", letter);
        letters.push(letter);
    }
}
