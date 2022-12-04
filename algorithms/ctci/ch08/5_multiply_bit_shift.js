const multiply = (a, b) => {
    if(a < b)
        return bitShift(a, b)
    else
        return bitShift(b, a)
}

const bitShift = (min, max) => {
    if(min === 0) {
        return 0
    }

    if(min === 1) {
        return max
    }

    var s = min >> 1
    halfProduct = bitShift(s, max)

    if(min % 2 === 0) {
        return halfProduct + halfProduct
    } else {
        return halfProduct + halfProduct + max
    }
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

