/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    var characterCount = new Map();
    var newS = '';

    for (var i = 0; i < s.length; i++) {
        var ch = s[i];

        if (characterCount.has(ch)) {
            characterCount.set(ch, characterCount.get(ch) + 1);
        } else {
            characterCount.set(ch, 1);
        }
    }

    for (var i = 0; i < s.length; i++) {
        if (characterCount.get(s[i]) > 1) {
            characterCount.set(s[i], characterCount.get(s[i]) - 1);
        } else {
            newS += s[i];
        }
    }
    return newS;
};

console.log(removeDuplicateLetters("bcabc"))
console.log(removeDuplicateLetters("cbacdcbc"))