const compressString = (s) => {
    var result = ""
    var currentCharCount = 1
    var secondLastChar
    var nextCharMatch	

    for(var i = 0; i < s.length - 1; i++) {
        if(s[i] === s[i+1]){
            currentCharCount++
            nextCharMatch = true
        } else {
            result += s[i] + currentCharCount
            currentCharCount = 1
            nextCharMatch = false
        }
        secondLastChar = s[i]
    }


    if(!nextCharMatch) {
        result += s[s.length - 1] + "1"
    } else {

        result += secondLastChar + currentCharCount
    }

    return  s.length>result.length?result:s
}

console.log("aabcccccaaa",compressString("aabcccccaaa"))
console.log("aabcccccaaab",compressString("aabcccccaaab"))
console.log("ai",compressString("ai"))
console.log("a",compressString("a"))

