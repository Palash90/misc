const isPalindromePermutation = (s) => {
    var evenCharCounts = 0
    var oddCharCounts = 0

    var charCount = buildCharCountMap(s)

    Object.values(charCount).forEach(v => {
        if(v%2 === 0){
            evenCharCounts++
        } else {
            oddCharCounts++
        }
    })

    if(s.length % 2 === 0) {
        return oddCharCounts === 0
    } else {
        return oddCharCounts === 1
    }

}

const buildCharCountMap = (s) => {
    var charCount = {}
    for(var i = 0; i < s.length; i++){
        if(charCount[s[i]]){
            charCount[s[i]]++
        } else {
            charCount[s[i]] = 1
        }
    }
    return charCount
}

console.log(isPalindromePermutation("mmada"))
console.log(isPalindromePermutation("mama"))
console.log(isPalindromePermutation("mmaa"))
console.log(isPalindromePermutation("mam"))
console.log(isPalindromePermutation("maom"))
console.log(isPalindromePermutation("mmdra"))

