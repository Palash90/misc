/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    var digits = [];
    if (x < 0) {
        return false;
    }

    while (x >= 1) {
        digits.push(x % 10);
        x = parseInt(x / 10);
    }

    var half = digits.length / 2;

    for (var i = 0; i < half; i++) {
        if (digits[i] !== digits[digits.length - i-1])
            return false;
    }

    return true;
};


console.log(121, isPalindrome(121));
console.log(-121, isPalindrome(-121));
console.log(10, isPalindrome(10));
console.log(45554, isPalindrome(45554));
console.log(123, isPalindrome(123));
console.log(21081990, isPalindrome(21081990));
console.log(22022022, isPalindrome(22022022));
console.log(22222, isPalindrome(22222));
console.log(11, isPalindrome(11));
console.log(8, isPalindrome(8));