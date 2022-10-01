/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    var splitString = s.split(" ");

    var newString = "";

    while (splitString.length !== 0) {
        var word = splitString.pop();
        if (word !== "")
            newString += word + " ";
    }
    return newString.trim();
};

console.log(reverseWords("the sky is blue"))

console.log(reverseWords("a good   example"))