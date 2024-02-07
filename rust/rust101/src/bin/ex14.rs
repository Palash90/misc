// Topic: Strings, String slices, structs, impl, fn, if altogether
struct Color {
    name: String,
}

struct Name {
    first: String,
    last: String,
    middle: String,
}

struct Person {
    name: Name,
    favorite_color: Color,
    age: i32,
}

fn print_color_str(data: &str) {
    println!("{}", data);
}

impl Color {
    fn from(name: &str) -> Color {
        Color {
            name: name.to_owned(),
        }
    }
    fn print(&self) {
        print_color_str(&self.name);
    }
}

impl Name {
    fn from(first_name: &str, middle_name: &str, last_name: &str) -> Name {
        Name {
            first: first_name.to_owned(),
            middle: middle_name.to_owned(),
            last: last_name.to_owned(),
        }
    }
    fn print(&self) {
        println!("{} {} {}", self.first, self.middle, self.last);
    }
}

impl Person {
    fn from(
        first_name: &str,
        middle_name: &str,
        last_name: &str,
        favorite_color: &str,
        age: i32,
    ) -> Person {
        Person {
            favorite_color: Color::from(favorite_color),
            age: age,
            name: Name::from(first_name, middle_name, last_name),
        }
    }
    fn print(&self) {
        self.name.print();
        self.favorite_color.print();
        println!("Age: {}", self.age);
    }
}

fn main() {
    let persons = vec![
        Person::from("Palash", "Kanti", "Kundu", "Red", 33),
        Person::from("Totan", "", "Das Kundu", "Green", 30),
        Person::from("Prapti", "", "Kundu", "Pink", 7),
    ];

    for person in persons {
        if person.age < 10 {
            person.print();
        }
    }
}
