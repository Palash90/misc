
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    var strHashes = {}

    for(var i = 0; i < strs.length; i++) {
        var currStr = strs[i]
        var currStrKey = new Array(26).fill(0)
        for(var j = 0; j < currStr.length; j++) {
            currStrKey[currStr[j].charCodeAt(0) - "a".charCodeAt(0)]++
        }

        if(strHashes[currStrKey]) {
            strHashes[currStrKey].push(currStr)
        } else {
            strHashes[currStrKey] = [currStr]
        }
    }  

    return Object.values(strHashes)
};

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
console.log(groupAnagrams([""]))
console.log(groupAnagrams(["a"]))
console.log(groupAnagrams(["cab","tin","pew","duh","may","ill","buy","bar","max","doc"]))

