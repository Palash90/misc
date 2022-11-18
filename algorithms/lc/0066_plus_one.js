/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    var carry = 0;
    var lastDigit = digits[digits.length - 1]

    if(lastDigit<9){
        digits[digits.length-1] += 1
    } else {
        digits[digits.length-1] = 0 
        carry = 1
    }

    for(var i = (digits.length - 2); i >= 0; i--){
        var digit = digits[i];

        if(carry === 1){
            if(digit < 9){
                digits[i] += 1
                carry = 0
            } else {
                digits[i] = 0
                carry = 1
            }
        }

    }

    if(carry === 1){
        return [1].concat(digits)
    }

    return digits
};

console.log(plusOne([1,2,3]))
console.log(plusOne([4,3,2,1]))
console.log(plusOne([9]))
