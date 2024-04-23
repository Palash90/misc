#[derive(Debug)]
struct Matrix<T> {
    dimensions: Vec<u32>,
    data: Vec<T>,
}

fn add_matrix<T>(a: Matrix<T>, b: Matrix<T>) -> Matrix<T> {
    // Returning a dummy matrix
    Matrix {
        dimensions: vec![1, 2],
        data: a.data,
    }
}

fn main() {
    let matrix_a = Matrix {
        dimensions: vec![1, 2],
        data: vec![3, 4],
    };

    let matrix_b = Matrix {
        dimensions: vec![1, 2],
        data: vec![3, 4],
    };

    let matrix_c = Matrix {
        dimensions: vec![1, 2],
        data: vec![3.4, 4.5],
    };

    let result = add_matrix(matrix_a, matrix_b);
    println!("{:#?}", result);

    // Following line won't work. Uncomment and compile too see why.
    // add_matrix(result, matrix_c);
}
