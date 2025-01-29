fn smallest<'a, 'b>(a: &'a Box<i32>, b: &'b Box<i32>) -> &'b Box<i32>
where
    'a: 'b,
{
    println!("Smallest function got two values - {}, {}", *a, *b);
    if *a < *b {
        return a;
    } else {
        return b;
    }
}

fn main() {
    let a = Box::new(42);

    let small: &Box<i32>;

    {
        let b = Box::new(40);

        println!("Given Values: {}, {}", *a, *b);

        small = smallest(&a, &b);
        
        println!("Smallest Value: {}", *small);
    }
}
