const findMaxRegion = (a) => {
    var rows = a.length
    var cols = a[0]?a[0].length:0
    var max = 0 

    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            if(a[i][j] === 1) {
                var regionCount = dfs(a, i, j)
                max = max > regionCount?max:regionCount
            }
        }
    }
    return max
}


const dfs = (a, i, j) => {
    if(i < 0 || j < 0 || i >= a.length || j >= a[0].length) {
        return 0
    }

    if(a[i][j] === 1){
        a[i][j] = 2
        var leftCount = dfs(a, i, j-1)
        var rightCount = dfs(a, i, j+1)
        var upCount = dfs(a, i-1, j)
        var downCount = dfs(a, i+1, j)
        return leftCount + rightCount + upCount + downCount + 1
    } else {
        return 0
    }
}

const printMatrix = (a) => {

    var rows = a.length
    var cols = a[0]?a[0].length:0


    for(var i = 0; i < rows; i++) {
        var s = ""
        for(var j = 0; j < cols; j++) {
            s += a[i][j] + "\t"
        }
        console.log(s)
    }
}

var a = [
    [1, 0, 1, 0, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1]
]
printMatrix(a)
console.log("Maximum Region",findMaxRegion(a))


a = [
    [1, 0, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1]
]
printMatrix(a)
console.log("Maximum Region",findMaxRegion(a))





