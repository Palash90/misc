class Node {
    constructor(val, next) {
        this.val = val
        this.next = next
    }
}


const twoPointerMove = (head) =>{
    var slow = head
    var fast = head

    while(fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if(fast === slow){
            console.log("List has a cycle", fast.val)
            break
        }
    }

    slow = head
    while(slow!=fast){
        fast = fast.next
        slow = slow.next
    }

    console.log("Loop at", fast.val)
}

var node1 = new Node(1)
var node2 = new Node(2)
var node3 = new Node(3)
var node4 = new Node(4)
var node5 = new Node(5)
var node6 = new Node(6)
var node7 = new Node(7)
var node8 = new Node(8)
var node9 = new Node(9)
var node10 = new Node(10)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node6
node6.next = node7
node7.next = node8
node8.next = node9
node9.next = node10

node10.next = node5 


twoPointerMove(node1)
