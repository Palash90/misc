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

        var permut = [...permutaion]
        permut = permut.push(currentElement)
        permutations.push(permut)
        for(var j = 0; j < permutation.length; j++) {
            var firstPart = permutation.slice(0, j)
            firstPart.push(currentElement)
            firstPart = firstPart.concat(permutaion.slice(j))
        }
        //        permutations.push(currentElement + permutation)

    }


    return permutations
}


console.log(getAllPermutations([1,2,3]))
