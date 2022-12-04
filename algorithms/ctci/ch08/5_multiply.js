const multiply = (m, n) => add(m, n, 0)

const add = (m, n, r) => {
    if(n === 0) {
        return r
    }

    return add(m, n - 1, r + m)
}

for(var i = 0; i < 100; i++) {
    for(var j = 0; j < 100; j++) {
        var result = multiply(i, j)
        var mult = Math.floor(i * j)
        if(mult !== result){
            console.log(i, j, multiply(i, j))
        }
        //        console.log(result)
    }
}
