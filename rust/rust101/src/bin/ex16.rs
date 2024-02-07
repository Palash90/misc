// Topic: Use of option

struct Student {
    name: String,
    locker: Option<i32>,
}

fn main() {
    let students = vec![
        Student {
            name: "Ram".to_owned(),
            locker: Some(4),
        },
        Student {
            name: "Shyam".to_owned(),
            locker: None,
        },
    ];

    for student in students {
        match student.locker {
            Some(n) => println!("{} is assigned locker {:?}", student.name, n),
            None => println!("{} is not assigned a locker", student.name),
        }
    }
}
