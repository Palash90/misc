/**
 * Definition for singly-linked list.
 *
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    if (!list1 && !list2) {
        return null;
    }

    if (list1 && !list2) {
        return list1;
    }

    if (list2 && !list1) {
        return list2;
    }

    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};

var l1 = new ListNode(1, new ListNode(2, new ListNode(3)));
var l2 = new ListNode(1, new ListNode(3, new ListNode(4)));

printListNode(mergeTwoLists(l1, l2));

l1 = null;
l2 = null;

printListNode(mergeTwoLists(l1, l2));

l1 = new ListNode(1);
l2 = null;

printListNode(mergeTwoLists(l1, l2));

l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
l2 = new ListNode(1, new ListNode(3, new ListNode(4)));

printListNode(mergeTwoLists(l1, l2));

function printListNode(l) {
    var s = '';
    while (l != undefined) {
        s += l.val + ' ';
        l = l.next;
    }
    console.log(s);
    console.log("-----");
}
