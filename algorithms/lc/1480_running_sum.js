/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
    var prevSum = 0;

    for(var i = 0; i < nums.length; i++){
        nums[i] += prevSum
        prevSum = nums[i]
    }

    return nums
};

console.log(runningSum([1,2,3,4]))
console.log(runningSum([1,1,1,1,1]))
console.log(runningSum([3,1,2,10,1]))
