#[derive(Debug)]
struct Matrix<T> {
    _dimensions: Vec<u32>,
    data: Vec<T>,
}

impl<T> Matrix<T> {
    fn add(self, _b: &Matrix<T>) -> Matrix<T> {
        // Returning a dummy matrix
        Matrix::<T> {
            _dimensions: vec![1, 2],
            data: self.data,
        }
    }
}

fn main() {
    let matrix_a = Matrix {
        _dimensions: vec![1, 2],
        data: vec![3, 4],
    };

    // Implicitly determined type
    let matrix_b = Matrix {
        _dimensions: vec![1, 2],
        data: vec![3, 4],
    };

    // Implicitly determined type
    let result = matrix_a.add(&matrix_b);
    println!("{:#?}", result);

    // Implicitly determined type
    let matrix_s = Matrix {
        _dimensions: vec![1, 2],
        data: vec![String::from("Hello"), String::from("World")],
    };

    // Implicitly determined type
    let matrix_t = Matrix {
        _dimensions: vec![1, 2],
        data: vec![String::from("Nice"), String::from("Day")],
    };

    let result = matrix_s.add(&matrix_t);
    println!("{:#?}", result);
}
