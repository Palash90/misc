/**
 * @param {number[]} nums1 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, nums2) {
    var i= j = k = 0
    var result = []

    var takeFromSecond = () =>     {
        result[k] = nums2[j]
        j++

    }

    var takeFromFirst = () => {
        result[k] = nums1[i]
        i++
    }

    while(true){
        if(i === nums1.length && j==nums2.length){
            break;
        } else if(i === nums1.length) {
            takeFromSecond()
        } else if(j === nums2.length) {
            takeFromFirst()
        } else {
            if(nums1[i]<nums2[j]){
                takeFromFirst()
            } else {
                takeFromSecond()
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
