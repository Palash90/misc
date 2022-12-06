/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    return  getPermutations(nums, nums.length - 1)
};

const getPermutations = (s, n) => {
    if(n === 0)
        return [[s[0]]]
    var permutations = []
    var remainingPermutations = getPermutations(s, n - 1)
    // console.log(n, remainingPermutations)
    var currentElement = s[n]

    for(var i = 0; i < remainingPermutations.length; i++) {
        var permutation = remainingPermutations[i]
        //        console.log("Line 19",permutation)
        var permut = [...permutation]
        permut = permut.concat(currentElement)
        permutations.push(permut)
        for(var j = 0; j < permutation.length; j++) {
            var firstPart = permutation.slice(0, j)
            firstPart.push(currentElement)
            firstPart = firstPart.concat(permutation.slice(j))
            permutations.push(firstPart)
        }
        //        permutations.push(currentElement + permutation)
    }


    return permutations
}


console.log(permute([1,2,3]))
