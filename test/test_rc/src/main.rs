use std::cell::RefCell;
use std::sync::Arc; // Change to std::rc::Rc for single threaded programs

#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn add_hello(s: Arc<RefCell<String>>) {
    s.borrow_mut().push_str("Hello");
}

fn add_world(s: Arc<RefCell<String>>) {
    s.borrow_mut().push_str("World");
}

fn make_linked_list() {
    let mut b = Box::new(32);

    println!("{b}");

    *b = 20;

    println!("{b}");

    let mut l = Nil;

    println!("{:?}", l);

    l = Cons(2, Box::new(Nil));

    println!("{:?}", l);

    l = Cons(3, Box::new(l));

    println!("{:?}", l);
}

fn main() {
    let s = String::new();

    let r = Arc::new(RefCell::new(s));

    add_hello(Arc::clone(&r));
    println!("{}", r.borrow());

    add_world(Arc::clone(&r));
    println!("{}", r.borrow());

    make_linked_list();
}
