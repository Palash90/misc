const urlify = (s, n) => {
    var index = s.length - 1
    for(var i = n-1; i>=0; i--){
        if(s[i] !== " "){
            s[index] = s[i]
            index--
        } else {
            s[index] = "0"
            s[index - 1] = "2"
            s[index - 2] = "%"
            index = index - 3
        }
    }
}

var s = "Mr. John Smith".split('').concat(['','','',''])
urlify(s, 14)
console.log(s.join(""))

s = " ".split("").concat(['',''])
urlify(s, 1)
console.log(s.join(""))

s = "pokemon".split('')
urlify(s,7)
console.log(s.join(""))
