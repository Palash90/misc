class Node {
    constructor(value){
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null;
    }
    insert(value){
        if(this.root === null){
            this.root = new Node(value)
            return
        }

        var current = this.root
        while(true){
            if(value<current.value){
                if(current.left === null){
                    current.left = new Node(value)
                    break 
                } else {
                    current = current.left
                }
            }

            if(value > current.value){
                if(current.right === null){
                    current.right = new Node(value)
                    break
                } else {
                    current = current.right
                }
            }

        }
    }
    lookup(value){
        //Code here
    }
    // remove
}

const tree = new BinarySearchTree();
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(15)
tree.insert(1)
console.log(JSON.stringify(traverse(tree.root), null, 4))

//     9
//  4     20
//1  6  15  170

function traverse(node) {
    const tree = { value: node.value };
    tree.left = node.left === null ? null : traverse(node.left);
    tree.right = node.right === null ? null : traverse(node.right);
    return tree;
}






