use std::time::Instant;


struct Dummy {
    id: i32
}

fn main() {
    let mut v: Vec<Dummy> = vec![];
    let mut i = 0;

    println!("Check memory of this process before creating objects");
    let stdin = std::io::stdin();
    let input = &mut String::new();
    let _ = stdin.read_line(input);

    let now = Instant::now();
    while i < 10_000_000 {
        v.push( Dummy {
            id: i
        });

        i = i + 1;
    }

    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
    let stdin = std::io::stdin();
    let input = &mut String::new();
    let _ = stdin.read_line(input);
}