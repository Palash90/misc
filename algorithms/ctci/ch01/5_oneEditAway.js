const oneEditAway = (s1, s2) => {
    console.log(s1, s2)
    const len1 = s1.length
    const len2 = s2.length

    if(Math.abs(len1 - len2) > 1) {
        return false
    }

    var index1 = 0
    var index2 = 0
    var diffFound = false

    while(index1 < len1 && index2 < len2) {
        if(s1[index1] !== s2[index2]){
            if(diffFound) 
                return false
            diffFound = true

            if(len1>len2){
                index1++
            } else if(len1 === len2) {
                index1++
                index2++
            } else {
                index2++
            }
        } else {
            index1++
            index2++
        }
    }
    return true
}

console.log(oneEditAway("pale", "ple"))
console.log(oneEditAway("pale", "bake"))
console.log(oneEditAway("palse", "pale"))
console.log(oneEditAway("pale", "bale"))
console.log(oneEditAway("pale", "bakes"))
console.log(oneEditAway("plate", "plates"))
console.log(oneEditAway("plate", "platess"))
console.log(oneEditAway("plate", "plat"))
console.log(oneEditAway("plate", "plt"))
console.log(oneEditAway("plate", "pltea"))



