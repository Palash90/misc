// Topic: Use of expression

enum AccessLevels {
    Admin,
    User,
}

fn main() {
    let is_file_available = false;
    let user_access = AccessLevels::Admin;

    let is_file_accessible = if is_file_available {
        match user_access {
            AccessLevels::Admin => true,
            AccessLevels::User => false,
        }
    } else {
        false
    };

    match is_file_accessible {
        true => println!("You are the best"),
        false => println!("I am ashamed of you"),
    }
}
