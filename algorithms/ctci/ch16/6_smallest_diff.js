const smallest = (a, b) => {
    a.sort((a, b) => a - b)
    b.sort((a, b) => a - b)
    var l = 0
    var r = 0
    var minDiff = Math.abs(a[0] - b[0])
    while(l < a.length && r < b.length) {
        if(Math.abs(a[l] - b[r]) < minDiff) {
            minDiff = Math.abs(a[l] - b[r])
        }

        if(a[l] < b[r]) {
            l++
        } else {
            r++
        }
    }

    return minDiff
}

console.log(smallest([4,3,1,2], [0,6,5,7]))
console.log(smallest([4,3,1,2], [1,6,5,7]))
console.log(smallest([1,3,15,11,2], [23,127,235,19,8]))
