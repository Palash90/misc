fn main() {
    let mut s = String::from("Palash");
    doly(&mut s);
    println!("{}", s);

    let long;
    let a = String::from("Hello");

    {
        let b = String::from("World!");
        long = longest(&a, &b);

        println!("{}", long);
    }
}

fn doly(s: &mut String) {
    s.push_str("Kundu");
}

fn longest<'a, 'b>(a: &'a String, b: &'b String) -> &'b String
where
    'a: 'b,
{
    if a.len() > b.len() {
        a
    } else {
        b
    }
}
