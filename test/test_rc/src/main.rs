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

fn make_linked_list() -> List {
    let mut b = Box::new(32);
    *b = 20;

    let mut l = Cons(2, Box::new(Nil));
    l = Cons(1, Box::new(l));
    l
}

fn change_value(l: &mut List) {
    match l {
        Cons(i, b) => {
            *i = *i * 10;
            change_value(b);
        },
        _ => {}
    }
}

fn show_list(l: &List) {
    match l {
        Nil => println!("End"),
        Cons(i, l) => {
            print!("{i}, ");
            show_list(&l);
        }
    }
}

fn main() {
    let s = String::new();

    let r = Arc::new(RefCell::new(s));

    add_hello(Arc::clone(&r));
    println!("{}", r.borrow());

    add_world(Arc::clone(&r));
    println!("{}", r.borrow());

    let mut l = make_linked_list();

    show_list(&l);

    change_value(&mut l);
    show_list(&l);
}
