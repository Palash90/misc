fn ret_str() -> &str {
    let s = String::from("Hello");
    &s[1..]
}

fn main(){
    let s = ret_str();
    println!("{s}");
}
