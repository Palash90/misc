use std::time::Instant;

fn fib(n: i32) -> i32 {
    if n < 2 {
        return n;
    }

    fib(n - 1) + fib(n - 2)
}

fn main() {
    let now = Instant::now();

    //println!("Fibonacci of 35: {}", fib(35));

    let n = 47;
    let mut fib = [0, 1];

    for i in 2..n {
        let f = fib[0] + fib[1];

        fib[0] = fib[1];
        fib[1] = f;
    }

    println!("Fibonacci of {}: {}", n, fib[1]);

    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
}
