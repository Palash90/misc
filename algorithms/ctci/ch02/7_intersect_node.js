class Node {
    constructor(val, next) {
        this.val = val
        this.next = next
    }
}


const findIntersect = (head1, head2) => {
    var nodeSet = new Set()

    while(head1) {
        nodeSet.add(head1)
        head1 = head1.next
    }

    while(head2) {
        if(nodeSet.has(head2)) {
            return head2
        }
        head2 = head2.next
    }
}

const findIntersectNoSpace = (head1, head2) => {
    const [length1, lastNode1] = findLengthAndLastNode(head1)
    const [length2, lastNode2] = findLengthAndLastNode(head2)

    if(lastNode1 !== lastNode2) {
        return null
    }

    if(length1 > length2) {
        var head1 = advanceList(head1, length1 - length2)
    }

    if(length2 > length1) {
        var head1 = advanceList(head1, length2 - length1)
    }

    while(head1){
        console.log(head1.val, head2.val)
        if(head1 === head2) {
            return head1
        }
        head1 = head1.next
        head2 = head2.next
    }

}

const advanceList = (head, n) => {
    while(head && n > 0) {
        head = head.next
        n--
    }
    return head
}

const findLengthAndLastNode = (head) => {
    var length = 0
    var lastNode = null
    while(head) {
        length++
        if(head) {
            lastNode = head
        }
        head = head.next
    }
    return [length, lastNode]
}


var node1 = new Node(1)
var node7 = new Node(87)
var node6 = new Node(45)
var node2 = new Node(2)
var node3 = new Node(3)
var node4 = new Node(4)
var node5 = new Node(5)

node1.next = node2
node2.next = node6
node6.next = node7
node7.next = node3

node5.next = node4
node4.next = node3
node3.next = new Node(999)

var head1 = node1
var head2 = node5

console.log(JSON.stringify(head1, null, 4), JSON.stringify(head2, null, 4))
console.log(findIntersectNoSpace(head1, head2))


