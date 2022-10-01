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
 * @return {boolean}
 */
var isBalanced = function (root) {
    if (root === null) {
        return true;
    }

    var leftHeight = height(root.left);
    var rightHeight = height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
    }

    return isBalanced(root.left) && isBalanced(root.right);
};

function height(root) {
    if (root === null) {
        return 0;
    }
    return Math.max(height(root.left), height(root.right)) + 1;
}

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

console.log(isBalanced(root));
console.log("*************************");

var rightLeftLeaf = new TreeNode(7, null, null);
var rightRightLeaf = new TreeNode(15, null, null);

var leftLeaf = new TreeNode(9, null, null);
var rightNode = new TreeNode(20, rightLeftLeaf, rightRightLeaf);

var root2 = new TreeNode(3, leftLeaf, rightNode);

console.log(isBalanced(root2));
console.log("*************************");

var root3 = new TreeNode(1, null, null);
root3.left = new TreeNode(2, null, null);
root3.right = new TreeNode(2, null, null);
root3.left.left = new TreeNode(3, null, null);
root3.left.right = new TreeNode(3, null, null);
root3.left.left.left = new TreeNode(4, null, null);
root3.left.left.right = new TreeNode(4, null, null);

console.log(isBalanced(root3));
console.log("*************************");

console.log(isBalanced(null));