/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    var value = 0;
    var roman = [...s];
    var numArr = [];

    for (var i = 0; i < roman.length; i++) {
        switch (roman[i]) {
            case 'I':
                numArr.push(1);
                break;
            case 'V':
                numArr.push(5);
                break;
            case 'X':
                numArr.push(10);
                break;
            case 'L':
                numArr.push(50);
                break;
            case 'C':
                numArr.push(100);
                break;
            case 'D':
                numArr.push(500);
                break;
            case 'M':
                numArr.push(1000);
                break;
        }
    }

    var i = 0;
    while (i < numArr.length) {
        if (numArr[i + 1] > numArr[i]) {
            value += numArr[i + 1] - numArr[i];
            i++;
        } else {
            value += numArr[i];
        }
        i++;
    }

    return value;
};

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    var units = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    var tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    var hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    var thousands = ["", "M", "MM", "MMM"];

    var unit = num % 10;
    num = parseInt(num / 10);
    var ten = num % 10;
    num = parseInt(num / 10);
    var hundred = num % 10;
    num = parseInt(num / 10);
    var thousand = num % 10;

    return thousands[thousand] + hundreds[hundred] + tens[ten] + units[unit];
};

var reps = []

for (var i = 1; i <= 3999; i++) {
    reps.push({ original: i, roman: intToRoman(i), converted: romanToInt(intToRoman(i)) });
}

console.table(reps);