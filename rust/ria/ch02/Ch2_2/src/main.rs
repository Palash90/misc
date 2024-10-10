fn main() {
    let a = 10; //u32::MAX;
    let b: u32 = 20;
    let c = 30u32;
    let d = 30_u32;

    println!(
        "(({} + {}) + ({} + {})) = {}",
        a,
        b,
        c,
        d,
        add(add(a, b), add(c, d))
    );
}

fn add(a: u32, b: u32) -> u32 {
    a + b
}
