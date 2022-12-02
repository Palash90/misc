class Tree {
    constructor(val) {
        this.val = val
        this.right = null
        this.left = null
    }
}

const findAncestor = (tree, p, q) => {
    if(!tree) {
        return null
    }
    var isPOnLeft = cover(tree.left, p)
    var isQOnLeft = cover(tree.left, q)

    if(isPOnLeft && !isQOnLeft) {
        return tree
    }

    return isPOnLeft?findAncestor(tree.left, p, q): findAncestor(tree.right, p, q)
}

const cover = (tree, n) => {
    if(!tree) {
        return false
    }

    if(tree === n) {
        return true
    }

    return cover(tree.left, n) || cover(tree.right, n)
}

var t4 = new Tree(4)
var t5 = new Tree(5)
var t6 = new Tree(6)
var t8 = new Tree(8)
var t9 = new Tree(9)
var t11 = new Tree(11)
var t10 = new Tree(10)
var t12 = new Tree(12)
var t13 = new Tree(13)
var t14 = new Tree(14)
var t15 = new Tree(15)

// Following two nodes are out of the tree
var t16 = new Tree(16)
var t17 = new Tree(17)


t4.left = t5
t4.right = t6

t5.left = t8
t5.right = t9

t6.left = t11
t6.right = t10

t11.left = t12
t11.right = t13

t10.left = t14
t10.right = t15

console.log("common ancestor between 5 and 6 is",findAncestor(t4, t5, t6).val)
console.log("common ancestor between 8 and 9 is",findAncestor(t4, t8, t9).val)
console.log("common ancestor between 8 and 6 is",findAncestor(t4, t8, t6).val)
console.log("common ancestor between 9 and 6 is",findAncestor(t4, t9, t6).val)
console.log("common ancestor between 11 and 10 is",findAncestor(t4, t11, t10).val)
console.log("common ancestor between 12 and 15 is",findAncestor(t4, t12, t15).val)
console.log("common ancestor between 12 and 10 is",findAncestor(t4, t12, t10).val)
console.log("common ancestor between 12 and 13 is",findAncestor(t4, t12, t13).val)

// No common ancestor
console.log("common ancestor between 16 and 10 is",findAncestor(t4, t16, t10))
console.log("common ancestor between 16 and 17 is",findAncestor(t4, t16, t17))
console.log("common ancestor between 17 and 10 is",findAncestor(t4, t17, t10))



