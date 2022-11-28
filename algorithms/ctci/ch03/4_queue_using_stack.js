class MyQueue {
    constructor() {
        this.s1 = []
        this.s2 = []
        this.first = null
    }

    push(item) {
        if(this.isEmpty()) {
            this.first = item
        }
        this.s1.push(item)
        console.log("After pushing the item", item, this.s1)
    }

    pop() {
        while(!this.isEmpty()) {
            this.s2.push(this.s1.pop())
        }
        console.log("After doing the stack operations", this.s1, this.s2)
        if(this.s2.length > 0) {
            var returnValue = this.s2.pop()
            this.first = this.s2[this.s2.length - 1]
            console.log("Returning", returnValue)
            while(this.s2.length !== 0) {
                this.s1.push(this.s2.pop())
            }

            if(this.s1.length === 0){
                this.first = null
            }
            return returnValue	
        } else {
            this.first = null
            console.log("Returning null")
            return null
        }
    }

    peek() {
        return this.first
    }

    isEmpty() {
        return this.s1.length === 0;
    }
}		

var q = new MyQueue()
q.push(1)
console.log("Peek", q.peek())
q.push(2)
console.log("Peek", q.peek())
q.push(3)
console.log("Peek", q.peek())
q.push(4)
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.push(6)
console.log("Peek", q.peek())
q.push(7)
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
q.pop()
console.log("Peek", q.peek())
