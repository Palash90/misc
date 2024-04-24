pub trait Numeric:
    Sized
    + Copy
    + std::ops::Add<Output = Self>
    + std::ops::Sub<Output = Self>
    + std::ops::Mul<Output = Self>
    + std::ops::Div<Output = Self>
{
}

// Implement Numeric for the types you listed
impl Numeric for i8 {}
impl Numeric for i16 {}
impl Numeric for i32 {}
impl Numeric for i64 {}
impl Numeric for i128 {}
impl Numeric for isize {}
impl Numeric for u8 {}
impl Numeric for u16 {}
impl Numeric for u32 {}
impl Numeric for u64 {}
impl Numeric for u128 {}
impl Numeric for usize {}
impl Numeric for f32 {}
impl Numeric for f64 {}

#[derive(Debug)]
pub struct NumericVec<T: Numeric> {
    vec: Vec<T>,
}

impl<T: Numeric> NumericVec<T> {
    pub fn new() -> Self {
        NumericVec { vec: Vec::new() }
    }

    pub fn push(&mut self, value: T) {
        self.vec.push(value);
    }
}

#[allow(dead_code)]
struct UnitStruct;

#[allow(dead_code)]
struct IntegerStruct(i32);

fn main() {
    // Following line should throw an error as no type is passsed
    //let i32Vec = NumericVec::new();
    let mut vec = NumericVec::<i8>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<i16>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<i32>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<i64>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<i128>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<isize>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<u8>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<u16>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<u32>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<u64>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<u128>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<usize>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<f32>::new();
    vec.push(1.0);
    println!("{:?}", vec);

    let mut vec = NumericVec::<f64>::new();
    vec.push(1.0);
    println!("{:?}", vec);

    /* The following code block won't compile due to bound.

    let mut vec = NumericVec::<char>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<bool>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<UnitStruct>::new();
    vec.push(1);
    println!("{:?}", vec);

    let mut vec = NumericVec::<IntegerStruct>::new();
    vec.push(1);
    println!("{:?}", vec);

    */

    // Following line will throw an error as String is not bound by Numeric
    // let strVec = NumericVec::<String>::new();
}
