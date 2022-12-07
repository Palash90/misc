/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    var counter = nums1.length - 1
    m--
    n--
    while(n >= 0) {
        if(m >= 0 && nums1[m] > nums2[n]) {
            nums1[counter] = nums1[m]
            m--
        } else {
            nums1[counter] = nums2[n]
            n--
        }
        counter--
    }
};


var a = [2,3,4,0,0,0]
var b = [2.1,5,6]
console.log(a,b)
merge(a, 3, b, 3)
console.log(a)
