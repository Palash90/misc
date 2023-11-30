// Topic Enum & Struct

#[derive(Debug)]
enum Flavour {
    Mango,
    Chocolate,
    Strawberry,
    Rose,
}

fn get_flavour_str(f: Flavour) -> String {
    match f {
        Flavour::Mango => String::from("mango"),
        Flavour::Chocolate => String::from("chocolate"),
        Flavour::Strawberry => String::from("strawberry"),
        Flavour::Rose => String::from("rose"),
    }
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
        "{} is drinking {:#?} {} {:#?} worth {} rupees",
        order.customer,
        order.size,
        get_flavour_str(order.drink.flavour),
        order.drink.t,
        order.cost
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

    let order = Order {
        customer: String::from("Rajat"),
        drink: Drink {
            t: DrinkType::Sharbat,
            flavour: Flavour::Strawberry,
        },
        size: Size::Large,
        cost: 20.0,
    };

    print_order(order);
}
