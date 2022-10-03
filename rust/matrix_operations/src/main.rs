fn main() {
	let mut matrix1: [[i32;3];3]= [[1;3];3];
	let mut matrix2: [[i32;3];3]= [[1;3];3];
	let mut matrix3: [[i32;3];3]= [[0;3];3];

	fill(&mut matrix1, 0);
	fill(&mut matrix2, 9);

	println!("First Matrix");
	print(matrix1);
	println!("Second Matrix");
	print(matrix2);

	for i in 0..3{
		for j in 0..3{
			matrix3[i as usize][j as usize] =  matrix1[i as usize][j as usize] + matrix2[i as usize][j as usize];   
		}
	}

	println!("Result Matrix");
	print(matrix3);
}

fn fill(matrix:&mut [[i32;3];3], offset:i32){
	for i in 0..3{
		for j in 0..3{
			matrix[i as usize][j as usize] = i * 3 + j + offset; 
		}
	}
}

fn print(matrix:[[i32;3];3]){
	for row in matrix{
		for cell in row {
			print!("{cell:02} ");
		}
		println!();
	}   
	println!();
}
