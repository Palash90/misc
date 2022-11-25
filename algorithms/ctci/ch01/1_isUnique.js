const isUnique = (s) => {
    const charExistence = {}

    for(var i = 0; i < s.length; i++) {
        if(charExistence[s[i]]) {
            return false
        } else {
            charExistence[s[i]] = true
        }
    }
    return true
}

console.log(isUnique("aab"))
console.log(isUnique("abc"))


