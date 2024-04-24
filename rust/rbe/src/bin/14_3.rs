struct Gen<T> {
    data: T,
}

// The following will fail
// impl Gen<T> { pub fn get(&self) -> T { self.data }}

// But this will pass

impl<T> Gen<T> {
    pub fn get(self) -> T {
        self.data
    }
}

fn main() {
    let g = Gen { data: 32 };
    println!("{}", g.get())
}