class ListNode {
    constructor(val){
        this.val = val
        this.next = null
    }
}

const list_depth_traversal = (tree) => {
    var q = []
    var lists = []
    if(tree) {
        q.push(tree)
    }
    while(q.length !== 0) {
        var initialLength = q.length
        var listNode = null
        var listTail = null

        for(var i = 0; i<initialLength; i++) {
            var levelNode = q.shift()
            if(levelNode.left) {
                q.push(levelNode.left)
            }

            if(levelNode.right) {
                q.push(levelNode.right)
            }

            if(!listNode) {
                listNode = new ListNode(levelNode.val)
                listTail = listNode
            } else {
                listTail.next = new ListNode(levelNode.val)
                listTail = listTail.next
            }
        }
        lists.push(listNode)
    }
    return lists
}

var tree = {
    "left": {
        "left": {
            "right": {
                "val": 18
            },
            "val": 12
        },
        "right": {
            "right": {
                "val": 37
            },
            "val": 35
        },
        "val": 22
    },
    "right": {
        "left": {
            "right": {
                "val": 58
            },
            "val": 54
        },
        "right": {
            "right": {
                "val": 80
            },
            "val": 72
        },
        "val": 60
    },
    "val": 45
}

console.log(JSON.stringify(list_depth_traversal(tree), null, 4))

tree = {
    "left": {
        "left": {
            "val": 1
        },
        "right": {
            "val": 3
        },
        "val": 2
    },
    "right": {
        "left": {
            "val": 5
        },
        "right": {
            "val": 7
        },
        "val": 6
    },
    "val": 4
}


console.log(JSON.stringify(list_depth_traversal(tree), null, 4))
console.log(JSON.stringify(list_depth_traversal(null), null, 4))
