/**
 * // Definition for a Node.
 */
function Node(val, next, random /*, name*/) {
    this.val = val;
    this.next = next;
    this.random = random;
    //  this.name = name;
};


/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
    var deepCopy;

    var nodeMap = new Map();
    var start = head;

    while (head) {
        var newNode = new Node(head.val, head.next, head.random/*, head.name + "-copy"*/);
        nodeMap.set(head, newNode);
        head = head.next;
    }

    head = start;
    var deepCopyHead = nodeMap.get(head);

    while (head) {
        deepCopy = nodeMap.get(head);
        deepCopy.next = nodeMap.get(head.next);
        deepCopy.random = nodeMap.get(head.random);

        deepCopy = deepCopy.next;
        head = head.next;
    }

    return deepCopyHead;
};

function printNodes(node) {
    while (node) {
        console.log("(", node.name, node.val, ") ---> ", "(", node.random ? node.random.name : "Null Random", node.random ? node.random.val : "Null random", ")");
        node = node.next;
    }
}

var node5 = new Node(1, null, null/*, "e"*/);
var node4 = new Node(10, node5, null/*, "d"*/);
var node3 = new Node(11, node4, null/*, "c"*/);
var node2 = new Node(13, node3, null/*, "b"*/);
var node1 = new Node(7, node2, null/*, "a"*/);

node5.random = node1;
node4.random = node3;
node3.random = node5;
node2.random = node1;
node1.random = null;

printNodes(node1);

printNodes(copyRandomList(node1));

printNodes(copyRandomList(null));