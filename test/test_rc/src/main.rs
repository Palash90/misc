use std::cell::RefCell;
use std::sync::Arc; // Change to std::rc::Rc for single threaded programs

fn add_hello(s: Arc<RefCell<String>>) {
    s.borrow_mut().push_str("Hello");
}

fn add_world(s: Arc<RefCell<String>>) {
    s.borrow_mut().push_str("World");
}

fn main() {
    let s = String::new();

    let r = Arc::new(RefCell::new(s));

    add_hello(Arc::clone(&r));
    println!("{}", r.borrow());

    add_world(Arc::clone(&r));
    println!("{}", r.borrow())
}
