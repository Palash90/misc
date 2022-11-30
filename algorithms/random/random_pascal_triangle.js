const pascal_triangle = (n) => {

    if(n <= 0) {
        return null
    }

    var a = []
    a[0] = [1]
    a[1] = [1,1]

    if(n === 1) {
        return a[0]
    }

    if(n === 2) {
        return a
    }
    for(var i = 2; i<n;i++) {
        a[i] = []
        a[i][0] = 1
        a[i][i] = 1
        for(var j = 1; j < i; j++){
            a[i][j] = a[i-1][j-1] + a[i-1][j] 
        }
    }

    return a
}

for(var i = 0; i < 10; i++) {
    console.log("***************************************")
    console.log(i)
    console.log(pascal_triangle(i))
    console.log("***************************************")
    console.log()       
}
