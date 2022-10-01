class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {

    var carry = 0;

    var node = null;

    while (l1 !== null || l2 !== null) {
        var placeValue = carry;

        if (l1 !== null) {
            placeValue += l1.val;
            l1 = l1.next;
        }

        if (l2 !== null) {
            placeValue += l2.val;
            l2 = l2.next;
        }

        node = new ListNode(placeValue % 10, node);

        carry = parseInt(placeValue / 10);
    }

    if (carry !== 0) {
        node = new ListNode(carry, node);
    }

    var prev = null;
    var current = node;
    var next = null;

    while (current != null) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    node = prev;
    return node;
};

var l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
var l2 = new ListNode(5, new ListNode(6, new ListNode(4)));

printListNode(addTwoNumbers(l1, l2))

l1 = new ListNode(0);
l2 = new ListNode(0);

printListNode(addTwoNumbers(l1, l2))

l1 = new ListNode(9);
l2 = new ListNode(1);

printListNode(addTwoNumbers(l1, l2))

l1 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))));
l2 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))));

printListNode(addTwoNumbers(l1, l2))

function printListNode(l) {
    while (l != undefined) {
        console.log(l.val);
        l = l.next;
    }
    console.log("-----");
}