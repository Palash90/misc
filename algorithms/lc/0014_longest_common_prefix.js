/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length === 1) {
        return strs[0];
    }
    var characters = [...strs[0]];
    var commonPrefix = "";

    for (var i = 0; i < characters.length; i++) {
        var matched = false;
        for (var j = 1; j < strs.length; j++) {
            if (strs[j][i] === characters[i]) {
                matched = true;
            } else {
                matched = false;
                break;
            }
        }
        if (matched) {
            commonPrefix += characters[i];
        } else {
            break;
        }

    }

    return commonPrefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "race car", "elephant"]));
console.log(longestCommonPrefix(["palash", "prapti"]));
console.log(longestCommonPrefix(["totan", "tripti"]));
console.log(longestCommonPrefix(["palash", "tripti"]));
console.log(longestCommonPrefix(["palash"]));
console.log(longestCommonPrefix(["sir", "sour"]));