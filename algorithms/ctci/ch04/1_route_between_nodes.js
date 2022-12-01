class Graph {
    constructor() {
        this.nodes = []
    }
}

class Node {
    constructor(val){
        this.val = val
        this.edges = []
        this.visited = false
    }
}

const routeExists = (graph, start, end) => {
    for(var i = 0; i<graph.nodes.length; i++) {
        graph.nodes[i].visited = false
    }

    var q = []
    q.push(start)

    while(q.length > 0) {
        var v = q.shift()
        if(v) {
            for(var i = 0; i < v.edges.length; i++) {
                var u = v.edges[i]
                if(!u.visited){
                    if(u === end) {
                        return true
                    } else {
                        q.push(u)
                    }
                }
            }	
            v.visited = true
        }
    }	
    return false
}


var g = new Graph()
var n1 = new Node(1)
var n2 = new Node(2)
var n3 = new Node(3)
var n4 = new Node(4)
var n5 = new Node(5)
var n6 = new Node(6)
var n7 = new Node(7)
var n8 = new Node(8)
var n9 = new Node(9)
var n10 = new Node(10)
var n11 = new Node(11)
var n12 = new Node(12)
var n13 = new Node(13)
var n14 = new Node(14)
var n15 = new Node(15)
var n16 = new Node(16)
var n17 = new Node(17)

n1.edges = [n2, n4, n5]
n2.edges = [n3, n1]
n3.edges = [n2]
n4.edges = [n6, n9, n1]
n5.edges = [n12, n1]
n6.edges = [n7, n4]
n7.edges = [n6]
n8.edges = [n13, n15, n9]
n9.edges = [n4, n10, n8]
n10.edges = [n11, n9]
n11.edges = [n10]
n12.edges = [n5]
n13.edges = [n8]
n14.edges = [n15]
n15.edges = [n14, n8]
n16.edges = [n17]
n17.edges = [n16]

g.nodes = [n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15, n16, n17]

console.log("Node 4 and node 12 is connected:",routeExists(g, n4, n12))
console.log("Node 4 and node 17 is connected:",routeExists(g, n4, n17))
console.log("Node 10 and node 17 is connected:",routeExists(g, n10, n17))
console.log("Node 10 and node 13 is connected:",routeExists(g, n10, n13))
