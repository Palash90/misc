/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    var rows = [];
    var columns = [];
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                rows.push(i);
                columns.push(j);
            }
        }
    }

    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < matrix[rows[i]].length; j++) {
            matrix[rows[i]][j] = 0;
        }
    }

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < columns.length; j++) {
            matrix[i][columns[j]] = 0;
        }
    }
}

var setZeroesNew = function (matrix) {
    var rows = [];
    var columns = [];
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                rows[i] = 0;
                columns[j] = 0;
            }
        }
    }

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (rows[i] === 0 || columns[j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
}

function printMatrix(a) {
    console.log("<------------------------------------>")
    for (var i = 0; i < a.length; i++) {
        var row = '';
        for (var j = 0; j < a[i].length; j++) {
            row += a[i][j] + '\t';
        }
        console.log(row)
    }
}

var input = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
printMatrix(input)
setZeroesNew(input)
printMatrix(input)

input = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
printMatrix(input)
setZeroesNew(input)
printMatrix(input)