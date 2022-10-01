/**
 */
// Definition for a Node.
function Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
};

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {

    if (!root) {
        return null;
    }

    var result = [];

    var q = [];
    q.push(root);


    while (true) {
        var nodeCount = q.length;

        if (nodeCount === 0) {
            break;
        }
        var orderData = [];
        while (nodeCount > 0) {
            var node = q.shift();
            orderData.push(node);

            if (node.left) {
                q.push(node.left);
            }

            if (node.right) {
                q.push(node.right);
            }

            nodeCount--;
        }

        result.push(orderData);
    }
    for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].length - 1; j++) {
            result[i][j].next = result[i][j + 1]
        }
    }
    return root;
};

var root = new Node(1, null, null);

var l1Left = new Node(2, null, null);
var l1Right = new Node(3, null, null);

var l2First = new Node(4, null, null);

var l2Second = new Node(5, null, null);
var l2Third = new Node(6, null, null);

l1Right.left = l2Second;
l1Right.right = l2Third;

l1Left.left = l2First;

root.left = l1Left;
root.right = l1Right;

var conected = connect(root);

while (root) {
    console.log(root.val);
    root = root.next;
}