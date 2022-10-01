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
var isValidBST = function (root) {

    return validateRange(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
};

var validateRange = (root, min, max) => {
    if (root === null) {
        return true;
    }

    if (root.val < min || root.val > max) {
        return false;
    }

    return validateRange(root.left, min, root.val - 1) && validateRange(root.right, root.val + 1, max);
}


var root = new TreeNode(4, null, null);

root.left = new TreeNode(2);
root.right = new TreeNode(5);

root.left.left = new TreeNode(1);
root.left.right = new TreeNode(6);

console.log(isValidBST(root))

root = new TreeNode(4, null, null);

root.left = new TreeNode(2);
root.right = new TreeNode(6);

root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);

root.right.right = new TreeNode(7);
root.right.left = new TreeNode(5);

console.log(isValidBST(root))