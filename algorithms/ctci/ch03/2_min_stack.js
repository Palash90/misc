class MinStack {
    constructor() {
        this.s1 = []
        this.s2 = []
    }

    push(value) {
        if(value <= this.getMin()) {
            this.s2.push(value)
        }
        this.s1.push(value)
        console.log("After pushing value", value, this.s1, this.s2)
    }

    pop() {
        if(this.top() === this.getMin()) {
            this.s2.pop()
        }
        var returnValue = this.s1.pop()
        console.log("After popping value", returnValue, this.s1, this.s2)
        return returnValue
    }

    top() {
        return this.s1[this.s1.length - 1]
    }

    getMin() {
        if(this.s1.length === 0) {
            return Number.MAX_VALUE
        } else {
            return this.s2[this.s2.length - 1]
        }
    }
}

var stack = new MinStack()
console.log("Calling getMin on empty stack",stack.getMin())
stack.push(4)
console.log("Getmin after pushing 4", stack.getMin())
stack.push(3)
console.log("Getmin after pushing 3", stack.getMin())
stack.push(5)
console.log("Getmin after pushing 5", stack.getMin())
stack.push(9)
console.log("Getmin after pushing 9", stack.getMin())
stack.push(2)
console.log("Getmin after pushing 2", stack.getMin())
stack.pop()
console.log("Getmin after popping", stack.getMin())
stack.pop()
console.log("Getmin after popping", stack.getMin())
stack.pop()
console.log("Getmin after popping", stack.getMin())
stack.pop()
console.log("Getmin after popping", stack.getMin())
stack.pop()
console.log("Getmin after popping", stack.getMin())





