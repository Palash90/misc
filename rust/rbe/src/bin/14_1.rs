#[derive(Debug)]
struct Matrix<T> {
    _dimensions: Vec<u32>,
    data: Vec<T>,
}

fn add_matrix<T>(a: Matrix<T>, _b: Matrix<T>) -> Matrix<T> {
    // Returning a dummy matrix
    Matrix {
        _dimensions: vec![1, 2],
        data: a.data,
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

    // Explicitly marked type
    let _matrix_c = Matrix::<f64> {
        _dimensions: vec![1, 2],
        data: vec![3.4, 4.5],
    };

    let matrix_d = Matrix {
        _dimensions: vec![1, 2],
        data: vec![3, 4],
    };

    // Explicitly marked with type
    let result = add_matrix::<i32>(matrix_a, matrix_b);
    println!("{:#?}", result);

    // Implicitly determined type
    let result = add_matrix(result, matrix_d);
    println!("{:#?}", result);

    // Following line won't work. Uncomment and compile too see why.
    // add_matrix(result, _matrix_c);
}
