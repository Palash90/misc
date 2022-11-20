/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    for(var i = 0; i<s.length/2; i++){
        var temp = s[s.length - i - 1]
        s[s.length-i-1] = s[i]
        s[i]=temp
    }
    return s
};

console.log(reverseString(["h", "e","l","l","0"]))
console.log(reverseString(["h"]))
console.log(reverseString(["h", "a","n","n","a", "h"]))
console.log(reverseString(["p", "a","l","a","s", "h"]))
console.log(reverseString("palash"));


