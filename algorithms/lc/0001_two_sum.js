/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {

    var map = new Map();

    for (var i = 0; i < nums.length; i++) {
        var temp = target - nums[i];
        if (map.has(temp)) {

            return [map.get(temp), i];
        }
        map.set(nums[i], i);
    }
};


var nums = [3, 3], target = 6;
console.log(twoSum(nums, target));

nums = [3, 5, 9, 12], target = 15;
console.log(twoSum(nums, target));