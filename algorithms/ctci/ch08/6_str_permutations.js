const getAllPermutations = (s) => getPermutations(s, s.length - 1)
const getPermutations = (s, n) => {
    if(n === 0)
        return s[0]
    var permutations = []
    var remainingPermutations = getPermutations(s, n - 1)
    //    console.log(n, remainingPermutations)
    var currentElement = s[n]

    for(var i = 0; i < remainingPermutations.length; i++) {
        var permutation = remainingPermutations[i]

        permutations.push(permutation + currentElement)
        for(var j = 0; j < permutation.length; j++) {
            permutations.push(permutation.slice(0, j) + currentElement + permutation.slice(j))
        }
        //        permutations.push(currentElement + permutation)
    }

    //    console.log(s, permutations)
    return permutations
}

console.log(getAllPermutations("123"))
