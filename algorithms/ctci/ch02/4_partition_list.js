class ListNode {
    constructor(val, next) { this.val = val
        this.next = next
    }
}

const partitionList = (head, partition) => {
    //TODO
}

var node = new ListNode(1, null)
node = new ListNode(2, node)
node = new ListNode(10, node)
node = new ListNode(5, node)
node = new ListNode(8, node)
node = new ListNode(5, node)
var head = new ListNode(3, node)

console.log(JSON.stringify(partitionList(head, 5), null, 4))
