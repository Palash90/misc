fn main(){
    let s = String::from("Hi");

    let  mut a = [0;3];

    println!("{:?}", a);
    let mut s=random(s);
    change_string(&mut s, &mut a);

    println!("{:?}",a);

    print(&mut s, &s);

    change_string(&mut s, &mut a);

    print(&mut s, &s);

    // Why the following throws error but not the above one?

    let d=&mut s;
    change_string(d, &mut a);

    let f = &s;
    //Mix of mutable and immutable borrow here
    print(&mut s, f);
    //  print(d);
    //  change_string(d);
}

fn random(mut s: String)->String{
    s.push_str("rando");
    print(&mut s, &s);
    s
}

// The following function will compile due to mutable references
fn change_string(s : &mut String, a: &mut [i32;3]) {
    a[1] = 1;
    a[2] = 2;
    a[0] = 3;
    println!("{:?}", a);
    s.push_str("Hello");
}


/*
// The following function will not compile due to immutable references
fn change_string(s : &String, a: &[i32;3]) {
a[1] = 1;
a[2] = 2;
a[0] = 3;
println!("{:?}", a);
s.push_str("Hello");
}
 */

fn print(ms: &mut String, s: &String){
    println!("{s}");
}
