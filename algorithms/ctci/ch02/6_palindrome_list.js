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
    // TODO - This method is faulty. You need to actually clone the list too.
    var reversed = reverseList(head)
    console.log("**************")
    console.log(JSON.stringify(head, null, 4), JSON.stringify(reversed, null, 4))
    console.log("**************")
    while(head){
        if(head.val !== reversed.val){
            return false
        }
        head = head.next
        reversed = reversed.next
    }
    return true
}

const twoPointerMove = (head) =>{
    var slow = head
    var fast = head
    var totalCount = 0
    var stack = []

    while(fast) {
        stack.push(slow.val)	
        fast = fast.next
        totalCount += fast?2:1
        fast = fast?fast.next:fast
        slow = fast?slow.next:slow
    }

    if(totalCount % 2 === 0){
        slow = slow.next
    }

    while(slow) {
        if(stack.pop() !== slow.val) {
            return false
        }
        slow = slow.next
    }	

    return true
}

var head1 = new Node(1, new Node(1, new Node(6)))
var head2 = new Node(5, new Node(9, new Node(2)))
var head3 = new Node(5, new Node(9, new Node(5)))
var head4 = new Node('m', new Node('a', new Node('d', new Node('r', new Node('m')))))
var head5 = new Node('m', new Node('a', new Node('a', new Node('m'))))
var head6 = new Node(1, new Node(2, new Node(3, new Node(4))))
var head7 = new Node(1)
var head8 = new Node(1, new Node(2))
var head9 = new Node(1, new Node(1))

/* */
console.log(JSON.stringify(head1, null, 4),isPalindrome(head1))
console.log(JSON.stringify(head2, null, 4),isPalindrome(head2))
console.log(JSON.stringify(head3, null, 4),isPalindrome(head3))
console.log(JSON.stringify(head4, null, 4),isPalindrome(head4))
console.log(JSON.stringify(head5, null, 4),isPalindrome(head5))
console.log(JSON.stringify(head6, null, 4),isPalindrome(head6))
console.log(JSON.stringify(head7, null, 4),isPalindrome(head7))
console.log(JSON.stringify(head8, null, 4),isPalindrome(head8))
console.log(JSON.stringify(head9, null, 4),isPalindrome(head9))

/*
console.log(JSON.stringify(head1, null, 4),twoPointerMove(head1))
console.log()
console.log(JSON.stringify(head2, null, 4),twoPointerMove(head2))
console.log()
console.log(JSON.stringify(head3, null, 4),twoPointerMove(head3))
console.log()
console.log(JSON.stringify(head4, null, 4),twoPointerMove(head4))
console.log()
console.log(JSON.stringify(head5, null, 4),twoPointerMove(head5))
console.log()
console.log(JSON.stringify(head6, null, 4),twoPointerMove(head6))
console.log()
console.log(JSON.stringify(head7, null, 4),twoPointerMove(head7))
console.log()
console.log(JSON.stringify(head8, null, 4),twoPointerMove(head8))
console.log()
console.log(JSON.stringify(head9, null, 4),twoPointerMove(head9))
 */



