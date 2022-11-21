class Node {
    constructor(value){
        this.value = value
        this.next = null
        this.prev = null
    }
}

class LinkedList {
    constructor(value) {
        this.head = new Node(value) 
        this.tail = this.head;
        this.length = 1;
    }

    append(value) {
        const newNode = new Node(value)
        this.tail.next = newNode;
        newNode.prev = this.tail
        this.tail = newNode;
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value)
        newNode.next = this.head
        newNode.prev = null
        this.head.prev = newNode
        this.head = newNode
        this.length++;
    }

    insert(index, value){
        if(index === this.length){
            this.append(value)
            return
        }

        var newNode = new Node(value)
        var currentNode = this._getNode(index-1)
        newNode.next = currentNode.next
        newNode.prev = currentNode
        newNode.next.prev = newNode

        currentNode.next = newNode
        this.length++
    }

    remove(index){
        var previousNode = this._getNode(index - 1)
        var nodeToBeDeleted = previousNode.next

        if(nodeToBeDeleted && nodeToBeDeleted.next){
            nodeToBeDeleted.next.prev = previousNode
            previousNode.next = nodeToBeDeleted.next
        } else {
            this.tail = previousNode
            previousNode.next = null
        }

        this.length--
    }

    get(index) {
        return this._getNode(index).value
    }

    _getNode(index){
        if(index >= this.length || index < 0){
            throw "Index out of bound"
        }

        var currentIndex = 0;
        var currentNode = this.head

        while(currentIndex < index){
            currentNode = currentNode.next
            currentIndex++
        }
        return currentNode
    }

    traverse(){
        var currentNode = this.head
        var path = ""
        while(currentNode){
            path+= currentNode.value + "--->"
            currentNode = currentNode.next
        }
        console.log(path)
        console.log()
    }

    traverseBackWords(){
        var currentNode = this.tail
        var path = ""
        while(currentNode){
            path+= currentNode.value + "--->"
            currentNode = currentNode.prev
        }
        console.log(path)
        console.log()
    }
}

let myLinkedList = new LinkedList(10);
console.log("Initial linkedlist")
myLinkedList.traverse()

myLinkedList.append(5);
console.log("After appending 5")
myLinkedList.traverse()

myLinkedList.append(16);
console.log("After appending 16")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

myLinkedList.prepend(1)
console.log("After prepending 1")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

myLinkedList.prepend(12)
console.log("After prepending 12")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

myLinkedList.insert(2, 53)
console.log("After insert at index 2")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

myLinkedList.append(26);
console.log("After appending 26")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

myLinkedList.prepend(9)
console.log("After prepending 9")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

myLinkedList.insert(8, 82)
console.log("After insert at index 8")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

console.log("Value at index 8 is", myLinkedList.get(8))

myLinkedList.remove(8)
console.log("After deleting node at index 8")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

myLinkedList.remove(5)
console.log("After deleting node at index 5")
myLinkedList.traverse()

console.log("Backword traversal")
myLinkedList.traverseBackWords()

