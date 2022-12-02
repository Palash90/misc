const validateBST = (tree) => {
    return checkTree(tree, Number.MIN_VALUE, Number.MAX_VALUE) > 0
}

const checkTree = (tree, min, max) => {
    if(!tree) {
        return true
    }

    if(tree.val < max && tree.val > min) {
        return checkTree(tree.left, min, tree.val) && checkTree(tree.right, tree.val, max)
    } else {
        return false
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

console.log(validateBST(tree))

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

console.log(validateBST(tree))
