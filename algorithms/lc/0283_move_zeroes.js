
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(arr) {
    var c = 0;

    for(var i = 0; i< arr.length; i++) {
        if(arr[i] != 0){
            arr[c] = arr[i]
            c++;
        }
    }

    for(var i = c; i<arr.length; i++) {
        arr[i] = 0;
    }

    return arr
}


var arr = [0,0,1,2,0,5,6,7,0]
console.log(arr, moveZeroes(arr))

