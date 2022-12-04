const buildSubsets = (a, n, prev) => {
    if(n === 0) {
        prev.push([])
        return
    }

    buildSubsets(a, n - 1, prev)

    var currentElement = a[n -1]
    var allPrevious = [...prev]

    for(var i = 0; i < allPrevious.length; i++) {
        var newSubset = [...allPrevious[i]]
        newSubset = newSubset.concat(currentElement)
        prev.push(newSubset)
    }
}

var a = [1, 2, 3]
var prev = []
buildSubsets(a, a.length, prev)
console.log(prev)

a = [1,2,3,4]
prev = []
buildSubsets(a, a.length, prev)
console.log(prev)

a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
prev = []
buildSubsets(a, a.length, prev)
console.log(prev)


