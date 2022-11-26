class Node {
    constructor(val, next) {
        this.val = val
        this.next = next
    }
}

const removeDuplicates = (head) => {
    var prev = null
    var current = head
    var values = new Set()	

    while(current) {
        if(values.has(current.val)) {
            prev.next = current.next
        } else {
            values.add(current.val)
            prev = current
        }
        current = current.next
    }
}

const removeDuplicatesNoSpace = (head) => {
    var current = head

    while(current) {
        var runner = current
        while(runner){
            if(runner.next && runner.next.val === current.val){
                runner.next = runner.next.next
            }
            runner = runner.next
        }		
        current = current.next
    }
}


const traverse = (head) => {
    var s = ""
    while(head){
        s += head.val + " -> "
        head = head.next
    }
    console.log(s)
}

var head = new Node(5)
head = new Node(4, head)
head = new Node(3, head)
head = new Node(2, head)
head = new Node(1, head)

traverse(head)
removeDuplicates(head)
traverse(head)

console.log()

head = new Node(5)
head = new Node(4, head)
head = new Node(3, head)
head = new Node(2, head)
head = new Node(1, head)

traverse(head)
removeDuplicatesNoSpace(head)
traverse(head)

console.log()

head = new Node(5)
head = new Node(3, head)
head = new Node(1, head)
head = new Node(2, head)
head = new Node(3, head)
head = new Node(2, head)
head = new Node(1, head)

traverse(head)
removeDuplicates(head)
traverse(head)



head = new Node(5)
head = new Node(3, head)
head = new Node(1, head)
head = new Node(2, head)
head = new Node(3, head)
head = new Node(2, head)
head = new Node(1, head)

traverse(head)
removeDuplicatesNoSpace(head)
traverse(head)


head = new Node(5)
