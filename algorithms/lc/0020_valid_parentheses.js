/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    var tokens = [];
    for (var i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '(':
            case '[':
            case '{':
                tokens.push(s[i]);
                break;
            case ')':
                if (tokens.length < 1 || tokens.pop() !== '(') {
                    return false;
                }
                break;
            case ']':
                if (tokens.length < 1 || tokens.pop() !== '[') {
                    return false;
                }
                break;
            case '}':
                if (tokens.length < 1 || tokens.pop() !== '{') {
                    return false;
                }
                break;
        }

    }

    return tokens.length === 0;
};

console.log(isValid("()"))
console.log(isValid("()[]"))
console.log(isValid("()[]{}"))
console.log(isValid("(]"))
console.log(isValid(""))
console.log(isValid("(([]))"))
console.log(isValid("(([])}"))
console.log(isValid("(([][]()))"))