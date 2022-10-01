/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (str) {
    var n = str.length;

    var res = 0;

    for (var i = 0; i < n; i++) {

        var visited = new Array(256);

        for (var j = i; j < n; j++) {

            if (visited[str.charCodeAt(j)] == true)
                break;
            else {
                res = Math.max(res, j - i + 1);
                visited[str.charCodeAt(j)] = true;
            }
        }
    }
    return res;
};

console.log(lengthOfLongestSubstring("abcd"))