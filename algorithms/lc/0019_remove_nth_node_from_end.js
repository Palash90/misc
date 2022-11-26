var removeNthFromEnd = function(head, n) {
    let fast = head, slow = head
    for (let i = 0; i < n; i++){
        fast = fast.next
    }
    if (!fast){
        head = head.next
        return head
    }
    while (fast.next)
        fast = fast.next, slow = slow.next
    slow.next = slow.next.next
    return head
};


class ListNode {
    constructor(val, next){
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function traverse(head) {
    var s = ""
    while(head) {
        s += head.val + " -> "
        head = head.next
    }
    console.log(s)
}

var head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))))
traverse(head)
traverse(removeNthFromEnd(head, 3))
console.log("After removing 3 from end")
traverse(head)
console.log("After removing 4 from end")
traverse(removeNthFromEnd(head, 4))
traverse(head)

head = new ListNode(1, null)
traverse(head)
removeNthFromEnd(head, 1)
console.log("After removing 1 from end")
traverse(head)

head = new ListNode(1, new ListNode(2, null))
traverse(head)
removeNthFromEnd(head, 2)
console.log("After removing 2 from end")
traverse(head)

head = new ListNode(1, new ListNode(2, new ListNode(3, null)))
traverse(head)
removeNthFromEnd(head, 3)
console.log("After removing 3 from end")
traverse(head)
