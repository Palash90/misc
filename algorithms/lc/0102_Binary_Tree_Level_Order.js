/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
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
            orderData.push(node.val);

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

    return result;
};

var root = new TreeNode(1, null, null);

var l1Left = new TreeNode(2, null, null);
var l1Right = new TreeNode(3, null, null);

var l2First = new TreeNode(4, null, null);

var l2Second = new TreeNode(5, null, null);
var l2Third = new TreeNode(6, null, null);

l1Right.left = l2Second;
l1Right.right = l2Third;

l1Left.left = l2First;

root.left = l1Left;
root.right = l1Right;

function print(arr) {
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            var levelNumbers = "";
            for (var j = 0; j < arr[i].length; j++) {
                levelNumbers += arr[i][j] + " ";
            }
            console.log(levelNumbers);
        }
    }
}

print(levelOrder(root));