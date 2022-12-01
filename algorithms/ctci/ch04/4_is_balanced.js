const isBalanced = (tree) => {
    if(!root)
        return true
    return checkHeight(tree) > 0
}

const checkHeight = (tree) => {
    if(!tree) {
        return 0
    }

    var leftHeight = checkHeight(tree.left)
    if(leftHeight < 0) {
        return -1
    }

    var rightHeight = checkHeight(tree.right)
    if(rightHeight < 0) {
        return -1
    }

    if(Math.abs(leftHeight - rightHeight) > 1) {
        return -1
    } else {
        return Math.max(leftHeight, rightHeight) + 1
    }
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

console.log(isBalanced(tree))

tree = {
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
                "val": 80,
                "left": {
                    "val":90,
                    "left":{
                        "val":91,
                        "left":{
                            "val":92
                        }
                    }
                }
            },
            "val": 72
        },
        "val": 60
    },
    "val": 45
}

console.log(isBalanced(tree))

