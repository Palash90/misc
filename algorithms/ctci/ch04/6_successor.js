class Node {
    constructor(val) {
        this.val = val
        this.right = null
        this.left = null
        this.par = null
    }
}

const findSuccessor = (tree) => {

    if(!tree) {
        return null
    }

    if(tree.right) {
        var child = tree.right

        while(child.left) {
            child = child.left
        }
        return child
    }  else {
        var par = tree.par

        while(par) {
            if(par.val > tree.val) {
                return par
            }
            //            console.log(par.val)
            par = par.par
        }

        return par
    }
}



var node1 = new Node(1)
var node1_5 = new Node(1.5)
var node2 = new Node(2)
var node3 = new Node(3)
var node4 = new Node(4)
var node5 = new Node(5)
var node6 = new Node(6)
var node6_5 = new Node(6.5)
var node7 = new Node(7)
var node8 = new Node(8)
var node9 = new Node(9)

node5.left = node2
node5.right = node6

node2.left = node1
node2.right = node4
node2.par = node5

node1.par = node2
node1.right = node1_5

node1_5.par = node1

node4.left = node3
node4.par = node2

node3.par = node4

node6.par = node5
node6.right = node8

node7.par = node8
node7.left = node6_5

node6_5.par = node7

node9.par = node8

node8.par = node6
node8.left = node7
node8.right = node9

console.log("1", findSuccessor(node1).val)
console.log("1.5", findSuccessor(node1_5).val)
console.log("2", findSuccessor(node2).val)
console.log("3", findSuccessor(node3).val)
console.log("4", findSuccessor(node4).val)
console.log("5", findSuccessor(node5).val)
console.log("6", findSuccessor(node6).val)
console.log("6.5", findSuccessor(node6_5).val)
console.log("7", findSuccessor(node7).val)
console.log("8", findSuccessor(node8).val)
console.log("9", findSuccessor(node9))
