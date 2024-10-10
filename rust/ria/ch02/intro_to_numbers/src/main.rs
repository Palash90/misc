fn main() {
    let twenty = 20;
    let twentyone = 21;
    let twentytwo = 22;

    let twentytwos = [22.0003, 22f32, 22.0_f32];

    let million = 10_00_000u64;

    println!("{} + {} + {} = {}", twenty, twentyone, twentytwo, twenty + twentyone + twentytwo);
    println!("{}", million.pow(2));

    println!("{:05}", twentytwos[0]);

    println!("{} = 0b{0:b} = 0o{0:o} = 0x{0:x}", twenty);

    let a = (-42.0_f32).sqrt();


    println!("{} {} {} {:b}", a, a.to_bits(), twentytwos[0].to_bits(), 0_f32.to_bits());

    assert_eq!(a, a);
}
