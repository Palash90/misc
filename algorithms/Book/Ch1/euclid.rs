fn main() {
    println!("{}", gcd(6, 18))
}
fn gcd(p: i32, q: i32) -> i32 {
    if q == 0 {
        return p;
    }
    gcd(q, p % q)
}
