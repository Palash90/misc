class Tree {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

const isSubtree = (t1, t2) => {
    if(!t2) {
        return true
    }
    return subTree(t1, t2)
}

const subTree = (t1, t2) => {
    if(!t1) {
        return false
    }

    if(t1.val === t2.val && matchTree(t1, t2)) {
        return true
    }

    return subTree(t1.left, t2) || subTree(t1.right, t2)
}

const matchTree = (t1, t2) => {
    if(!t1 && !t2) {
        return true
    } else if(!t1 || !t2) {
        return false
    } else if(t1.val !== t2.val) {
        return false
    } else {
        return matchTree(t1.left, t2.left) && matchTree(t1.right, t2.right)
    }
}


var n1 = new Tree(1)
var n2 = new Tree(2)
var n3 = new Tree(3)
var n4 = new Tree(4)
var n5 = new Tree(5)
var n6 = new Tree(6)
var n7 = new Tree(7)
var n4_1 = new Tree(4)
var n9 = new Tree(9)
var n6_1 = new Tree(6)
var n4_2 = new Tree(4)
var n6_2 = new Tree(6)
var n7_2 = new Tree(7)
var n8 = new Tree(8)

n1.left = n2
n1.right = n3

n3.left = n4
n3.right = n5

n4.left = n6
n4.right = n7

n5.right = n4_1

n4_1.left = n9
n4_1.right = n6_1

n6_1.right = n4_2

n4_2.left = n6_2
n4_2.right = n7_2

n7_2.right = n8

console.log(isSubtree(n4_2, n4))
console.log(isSubtree(n1, n4))
