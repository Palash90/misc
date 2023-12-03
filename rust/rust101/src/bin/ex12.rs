// Topic: impl demo

enum Color {
    Red,
    Green,
    Blue,
}

impl Color {
    fn display(&self) -> String {
        match self {
            Color::Red => String::from("Red"),
            Color::Green => String::from("Green"),
            Color::Blue => String::from("Blue"),
        }
    }
}

struct Dimension {
    length: f64,
    width: f64,
    height: f64,
}

impl Dimension {
    fn new(length: f64, width: f64, height: f64) -> Self {
        Dimension {
            length,
            width,
            height,
        }
    }
    fn display(&self) -> String {
        String::from(format!(
            "{0}m length, {1}m width, {2}m height",
            self.length, self.width, self.height
        ))
    }
}

struct ShippingBox {
    dimension: Dimension,
    weight: f64,
    color: Color,
}

impl ShippingBox {
    fn new(dimension: Dimension, weight: f64, color: Color) -> Self {
        ShippingBox {
            dimension,
            weight,
            color,
        }
    }

    fn print_box(&self) {
        println!(
            "The box has {}, {} weight, {} color",
            self.dimension.display(),
            self.weight,
            self.color.display()
        );
    }
}

fn main() {
    let red_box_light = ShippingBox::new(Dimension::new(2.0, 2.0, 2.0), 40.0, Color::Red);
    let green_box_medium = ShippingBox::new(Dimension::new(2.0, 2.0, 2.0), 60.0, Color::Green);
    let blue_box_heavy = ShippingBox::new(Dimension::new(2.0, 2.0, 2.0), 80.0, Color::Blue);
    red_box_light.print_box();
    green_box_medium.print_box();
    blue_box_heavy.print_box();
}
