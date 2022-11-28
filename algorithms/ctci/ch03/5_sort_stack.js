const sortStack = (s) => {
    var s2 = []

    while(s.length !== 0) {
        var temp = s.pop()

        while(s2.length !== 0 && s2[s2.length - 1] < temp) {
            s.push(s2.pop())
        }

        s2.push(temp)
    }

    while(s2.length !== 0) {
        s.push(s2.pop())
    }
}

var s = [7,6,3,4,2,8,9,1,0,3]

console.log(s)
sortStack(s)
console.log(s)
