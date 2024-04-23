#[derive(Debug)]
struct Concrete;

#[derive(Debug)]
struct SingleType(Concrete);

#[derive(Debug)]
struct GenericType<T>(T);

fn main() {
    let _c = Concrete;
    println!("{:?}", _c);

    let _s = SingleType(_c);
    let _t = GenericType(Concrete);
    let _i32 = GenericType(6);
    let _char = GenericType('b');

    println!("{:?}", _s);
    println!("{:?}", _t);
    println!("{:?}", _i32);
    println!("{:?}", _char);
}
