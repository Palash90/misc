// Topic: Use enum to display color in terminal. Use enum as function parameter.

enum Color {
    Red,
    Green,
    Blue,
}

fn main() {
    let my_gemstone_color = Color::Red;
    display(my_gemstone_color);

    let my_gemstone_color = Color::Green;
    display(my_gemstone_color);

    let my_gemstone_color = Color::Blue;
    display(my_gemstone_color)
}

fn display(color: Color) {
    match color {
        Color::Red => println!("Ruby"),
        Color::Green => println!("Emerald"),
        Color::Blue => println!("Sapphire"),
    }
}
