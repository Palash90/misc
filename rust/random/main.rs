fn main(){
    let s = String::from("Hi");

    let mut s=random(s);
    change_string(&mut s);

    print(&s);
    
    // Why the following is throws error but not the above one?

    let d=&mut s;
    change_string(d);

    let f = &s;

    print(f);
  //  print(d);
  //  change_string(d);
}

fn random(mut s: String)->String{
    s.push_str("rando");
    print(&s);
    s
}

fn change_string(s : &mut String) {
    s.push_str("Hello");
}

fn print(s: &String){
    println!("{s}");
}
