class Node {
    constructor(val, next) {
        this.val = val
        this.next = next
    }
}

const reverseList = (head) => {
    var prev = null
    var current = head
    while(current) {
        var temp = current.next
        current.next = prev
        prev = current
        current = temp
        if(current)
            head = current
    }
    return head 
}

const isPalindrome = (head) => {
    var reversed = reverseList(head)
    while(head){
        if(head.val !== reversed.val){
            return false
        }
        head = head.next
        reversed = reversed.next
    }
    return true
}

var head1 = new Node(1, new Node(1, new Node(6)))
var head2 = new Node(5, new Node(9, new Node(2)))
var head3 = new Node(5, new Node(9, new Node(5)))
var head4 = new Node('m', new Node('a', new Node('d', new Node('a', new Node('m')))))
console.log(JSON.stringify(head1, null, 4),isPalindrome(head1))
console.log(JSON.stringify(head2, null, 4),isPalindrome(head2))
console.log(JSON.stringify(head3, null, 4),isPalindrome(head3))
console.log(JSON.stringify(head4, null, 4),isPalindrome(head4))

