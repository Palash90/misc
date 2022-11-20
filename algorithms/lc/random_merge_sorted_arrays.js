/**
 * @param {number[]} nums1 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, nums2) {
    var i= j = k = 0
    var result = []

    while(true){
        if(i === nums1.length && j==nums2.length){
            break;
        } else if(i === nums1.length) {
            result[k] = nums2[j]
            j++
        } else if(j === nums2.length) {
            result[k] = nums1[i]
            i++
        } else {
            if(nums1[i]<nums2[j]){
                result[k] = nums1[i]
                i++
            } else {
                result[k] = nums2[j]
                j++
            }
        }
        k++
    }

    return result
};

console.log([2,3,5], [1,4,5],merge([2,3,5], [1,4,5]))
console.log([0,3,4,31,32], [4,6,30],merge([0,3,4,31,32], [4,6,30]))
console.log([0,3,4,31,32], [4,6,30,54,62,63],merge([0,3,4,31,32], [4,6,30,54,62,63]))
console.log([], [1,2,3], merge([], [1,2,3]))
console.log([1,2,3], [], merge([1,2,3], []))
console.log([], [], merge([], []))
