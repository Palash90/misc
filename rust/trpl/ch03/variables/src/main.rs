fn main() {
    println!("Hello, world!");
    let x = 2;

    {
        // x = 3; // This line will give compiler error as x in the outer scope is not mut
        // let x = 3; // This line will shadow the outer scope x
        let mut x = 3; // This line will shadow the outer scope x with mutable reference
        println!("Value of x in inner scope is {}", x);
        x = 4; // This line changes value of shadowed x
        println!("Value of x in inner scope after changing its value is {}", x);
    }

    //    x = 5; // This line will give compiler error
    println!("Value of x in Outer Scope is {}", x);

    let x = x+1; // This will shadow the outer scope x

    println!("Value of x in Outer Scope after shadowing is {}", x);

    let x = "Hello"; // This will again shadow the x variable with a different type

    println!("Value of x in Outer Scope after shadowing to different type is {}", x);
}
