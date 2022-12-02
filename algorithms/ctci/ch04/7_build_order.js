class Graph {
    constructor(){
        this.nodes = []
    }
}

class Node {
    constructor(name) {
        this.name = name
        this.calculating = false
        this.built = false
        this.adj = []
    }
}

const buildOrder = (g) => {
    for(var i = 0; i<g.nodes.length; i++) {
        g.nodes[i].calculating = false
        g.nodes[i].built = false
    }

    var checkTree = (node) => {
        if(node.built) {
            return true
        }
        if(node.adj.length === 0) {
            node.built = true
            node.calculating = false
            console.log(node.name)
            return true
        }
        node.calculating = true
        for(var i = 0; i<node.adj.length; i++) {
            if(node.adj[i].calculating) {
                console.log("Build Cycle detected for", node.name, node.adj[i].name)
                return false
            }

            if(!node.adj[i].built) {
                var nodeBuilt = checkTree(node.adj[i])
                if(!nodeBuilt)
                    return false
            }
        }
        node.calculating = false
        node.built = true
        console.log(node.name)
        return true
    }

    for(var i = 0; i<g.nodes.length; i++) {
        //        console.log("Checking", g.nodes[i])
        var nodeBuilt = checkTree(g.nodes[i])
        //        console.log(nodeBuilt)
        //        console.log("*****************************")
        //        console.log()
        if(!nodeBuilt) {
            break			
        }
    }
}

var a = new Node("a")
var b = new Node("b")
var c = new Node("c")
var d = new Node("d")
var e = new Node("e")
var f = new Node("f")

var g = new Graph()
g.nodes = [a, b, c, d, e, f]

a.adj = [f, c]
b.adj = [f]
c.adj = [d]
d.adj = [a, b]

buildOrder(g)
