/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    if (!s) {
        return 0;
    }

    var substringSet = new Set();

    for (var i = 0; i < s.length; s++) {
        expand(s, i, i, substringSet);
        expand(s, i, i + 1, substringSet);
    }

    return substringSet;
};

function expand(s, i, j, set){
    while (i >= 0 && j <s.length && s[i] === s[j]) {
        set.add(s.substring(i, j + 1));

        i--;
        j++;
    }
}

console.log(countSubstrings("aabb"));