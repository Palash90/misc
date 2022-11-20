/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const countTracker = {}

    for(var i = 0; i<nums.length; i++) {
        var num = nums[i]
        if(!countTracker[num]){
            countTracker[num] = 1
        } else {
            return true
        }
    }
    return false 
};

console.log(containsDuplicate([1,2,3,1]))
console.log()
console.log(containsDuplicate([1,2,3,4]))
console.log()
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]))


