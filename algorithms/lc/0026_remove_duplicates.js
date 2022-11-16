/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    var current = 0;	
    for(var i = 0; i < nums.length; i++){
        if(nums[current] === nums[i]){
            continue;
        } else {
            current = current + 1;
            nums[current] = nums[i];
        }
    }
    return current + 1;

};
