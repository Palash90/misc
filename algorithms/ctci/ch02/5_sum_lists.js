class Node {
    constructor(val, next) {
        this.val = val
        this.next = next
    }
}

const addLists = (head1, head2) => {
    var carry = 0
    var sum = 0
    var result = null
    var resultHead = null

    while(head1 || head2) {
        var addend1 = head1?head1.val:0
        var addend2 = head2?head2.val:0
        var sum = addend1 + addend2 + carry
        carry = Math.floor(sum/10)
        sum = sum % 10
        head1 = head1?head1.next:null
        head2 = head2?head2.next:null

        if(result) {
            result.next = new Node(sum)
            result = result.next
        } else {
            result = new Node(sum)
            resultHead = result
        }
    }

    if(carry !== 0) {
        result.next = new Node(carry)
    }

    return resultHead
}

var head1 = new Node(7, new Node(1, new Node(6)))
var head2 = new Node(5, new Node(9, new Node(2)))

console.log(JSON.stringify(addLists(head1, head2), null, 4))

head1 = new Node(7, new Node(1, new Node(6, new Node(1))))
head2 = new Node(5, new Node(9, new Node(2)))

console.log(JSON.stringify(addLists(head1, head2), null, 4))

head1 = new Node(7, new Node(1, new Node(6, new Node(1))))
head2 = new Node(5, new Node(9, new Node(3)))

console.log(JSON.stringify(addLists(head1, head2), null, 4))

console.log(JSON.stringify(addLists(new Node(1), null), null, 4))
