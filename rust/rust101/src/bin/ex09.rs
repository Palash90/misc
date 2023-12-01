//Topic: Use of tuples to describe co-ordinates

fn get_coordinates() -> (i32, i32) {
    (4, 6)
}

fn main() {
    let (x, y) = get_coordinates();

    if y < 5 {
        println!("Y is small");
    } else if y == 5 {
        println!("Y just hit the sweet spot of being 5");
    } else {
        println!("Y is large");
    }
}
