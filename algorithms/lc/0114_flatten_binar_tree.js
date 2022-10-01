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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    
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

flatten(root)

function print(root) {
    while (root) {
        console.log(root.val);
        root = root.right;
    }
}