const isPermutation = (s1, s2) => {
    if(s1.length !== s2.length) {
        return false
    }

    var firstCharMap = buildCharMap(s1)
    var secondCharMap = buildCharMap(s2)

    var unmatched = false

    var firstCharMapKeys = Object.keys(firstCharMap)

    for(var i = 0; i < firstCharMapKeys.length; i++) {
        var k = firstCharMapKeys[i]
        if(firstCharMap[k] !== secondCharMap[k]) {
            return false
        } else {
            delete firstCharMap[k]
            delete secondCharMap[k]
        }
    }

    if(Object.keys(secondCharMap).length > 0){
        unmatched = true
    }	

    return !unmatched
}

const buildCharMap = (s) => {
    var charMap = {}

    for(var i = 0 ; i < s.length; i++) {
        if(charMap[s[i]]) {
            charMap[s[i]]++
        } else {
            charMap[s[i]] = 1
        }
    }

    return charMap
}

console.log(isPermutation("abcd", "bcda"))
console.log(isPermutation("abbd", "bcda"))
console.log(isPermutation("abbda", "bcda"))
console.log(isPermutation("aa", "ab"))
console.log(isPermutation("ab", "ab"))
console.log(isPermutation("ab", "ba"))


