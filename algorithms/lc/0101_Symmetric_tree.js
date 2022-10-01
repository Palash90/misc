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
var isSymmetric = function (root) {
    return isMirror(root, root);
};

function isMirror(firstNode, secondNode) {
    if (firstNode === null && secondNode === null) {
        return true;
    }

    if (firstNode != null && secondNode != null && firstNode.val === secondNode.val) {
        return isMirror(firstNode.left, secondNode.right) && isMirror(secondNode.left, firstNode.right);
    }

    return false;
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

console.log(isSymmetric(root))

var root2 = new TreeNode(1, null, null);
var root2Left = new TreeNode(2, null, null);
var root2Right = new TreeNode(2, null, null);
var root2LeftLeft = new TreeNode(3, null, null);
var root2LeftRight = new TreeNode(4, null, null);
var root2RightLeft = new TreeNode(4, null, null);
var root2RightRight = new TreeNode(3, null, null);

root2Left.left = root2LeftLeft;
root2Left.right = root2LeftRight;

root2Right.left = root2RightLeft;
root2Right.right = root2RightRight;

root2.left = root2Left;
root2.right = root2Right;

console.log(isSymmetric(root2));