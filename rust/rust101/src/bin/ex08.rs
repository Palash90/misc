// Topic Enum & Struct

#[derive(Debug)]
enum Flavour {
    Mango,
    Chocolate,
    Strawberry,
    Rose,
}

#[derive(Debug)]
enum Size {
    Small,
    Medium,
    Large,
    XL,
    Family,
}

#[derive(Debug)]
enum DrinkType {
    Lasyi,
    Sharbat,
}

#[derive(Debug)]
struct Drink {
    t: DrinkType,
    flavour: Flavour,
}

#[derive(Debug)]
struct Order {
    customer: String,
    drink: Drink,
    size: Size,
    cost: f64,
}

fn print_order(order: Order) {
    println!(
        "{} is drinking {:#?} {:#?} {:#?}",
        order.customer, order.size, order.drink.flavour, order.drink.t
    )
}

fn main() {
    let order = Order {
        customer: String::from("Sumit"),
        drink: Drink {
            t: DrinkType::Lasyi,
            flavour: Flavour::Mango,
        },
        size: Size::Large,
        cost: 10.0,
    };

    print_order(order);
}
