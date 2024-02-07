// Topic: Advanced Match
enum TicketType {
    Backstage(i32, String),
    Vip(i32, String),
    Standard(i32),
}

fn main() {
    let tickets = vec![
        TicketType::Backstage(100, "Palash Kanti Kundu".to_owned()),
        TicketType::Vip(75, "Deba Chandi".to_owned()),
        TicketType::Standard(40),
    ];

    for ticket in tickets {
        match ticket {
            TicketType::Backstage(price, name) => {
                println!("Backstage ticket is owned by {}, price is {}", name, price)
            }
            TicketType::Vip(price, name) => {
                println!("Vip ticket is owned by {}, price is {}", name, price)
            }
            TicketType::Standard(price) => println!("Ticket price is {}", price),
        }
    }
}
