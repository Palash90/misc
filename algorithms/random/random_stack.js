// add a method prepend() to the linked list that adds a node to the beginning of the list

class Node {
    constructor(value){
        this.value = value
        this.next = null
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
        this.tail = newNode;
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value)
        newNode.next = this.head
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
        currentNode.next = newNode
        this.length++
    }

    remove(index){
        var previousNode = this._getNode(index - 1)
        previousNode.next = previousNode.next===null?null:previousNode.next.next 
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

    reverse(){
        var prev = null;
        var curr = this.head;
        this.tail = this.head
        while (curr) {
            var temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
            if(curr){
                this.head = curr
            }
        }
    }
}

class Stack {
    constructor(value){
        this.list = new LinkedList(value)
    }

    peek(){
        return this.list.get(this.list.length - 1)
    }

    push(value) {
        this.list.append(value)
    }

    pop() {
        var value = this.peek()
        this.list.remove(this.list.length - 1)
    }

    traverse() {
        this.list.traverse()
    }
}


var stack = new Stack(10)
stack.traverse()

stack.push(15)
stack.traverse()

stack.push(20)
stack.traverse()

stack.pop()
stack.traverse()

