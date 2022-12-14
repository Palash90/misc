/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    var countMap = {}
    var freq = [...Array(nums.length + 1)].map(e => Array(0))

    for(var i = 0; i < nums.length; i++) {
        if(countMap[nums[i]]) {
            countMap[nums[i]]= countMap[nums[i]] + 1
        } else {
            countMap[nums[i]] = 1
        }
    }

    for (const [key, value] of Object.entries(countMap)) {
        freq[value].push(key)
    }

    var numbers = [];

    for(var i = freq.length - 1; i >= 0; i--) {
        if(k === 0) {
            break
        }

        if(freq[i].length === 0) {
            continue
        } else {
            var toBePushed = freq[i]
            numbers.push(...toBePushed)
            k = k - toBePushed.length
        }
    }
    console.log(numbers)
    return numbers
};

topKFrequent([1,1,1,2,2,3], 2)
topKFrequent([1,1,1,2,2,3,3,3], 2)
topKFrequent([1], 1)
