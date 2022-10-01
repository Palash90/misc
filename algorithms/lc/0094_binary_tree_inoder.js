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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    var data = [];
    if (root === null) {
        return data;
    }

    var leftData = inorderTraversal(root.left);
    data = data.concat(...leftData);

    data.push(root.val);

    var rightData = inorderTraversal(root.right);
    data = data.concat(...rightData);

    return data;
};


var root = new TreeNode(4, null, null);

root.left = new TreeNode(2);
root.right = new TreeNode(5);

root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);

console.log(inorderTraversal(root))

root = new TreeNode(4, null, null);

root.left = new TreeNode(2);
root.right = new TreeNode(6);

root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);

root.right.right = new TreeNode(7);
root.right.left = new TreeNode(5);

console.log(inorderTraversal(root))