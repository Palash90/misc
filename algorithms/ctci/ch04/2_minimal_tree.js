class Node {
    constructor(val){
        this.left = null
        this.right = null
        this.val = val
    }
}

const buildTree = (a, low, high) => {
    if(low > high){
        return
    }

    var mid = Math.floor((low + high) / 2)

    var root = new Node(a[mid])
    root.left = buildTree(a, low, (mid - 1))
    root.right = buildTree(a, (mid + 1), high)

    return root
}

var a = []
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))

a = [2]
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))

a = [1,4]
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))

a = [1,2,3]
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))

a = [1,2,3,4]
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))

a = [1,2,3,4,5]
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))

a = [1,2,3,4,5,6]
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))

a = [1,2,3,4,5,6,7]
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))

a = [12, 18, 22, 35, 37, 45, 54, 58, 60, 72, 80]
console.log(a, JSON.stringify(buildTree(a, 0, (a.length - 1)), null, 4))



