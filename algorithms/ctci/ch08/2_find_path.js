var reachable = 0
const findPath = (m) => {
    if(m.length === 0) {
        return false
    }

    if(m[0].length === 0) {
        return false
    }

    reachable = 0
    dfs(m, 0, 0, m.length - 1, m[0].length - 1, 0)
    console.log(reachable)
}

const dfs = (m, r, c, er, ec) => {
    if(r >= m.length || c >= m[0].length) {
        return
    }

    if(m[r][c] === 1) {
        return
    }

    if(r === er && c === ec) {
        reachable++
        return
    }

    var newRow = r + 1
    var newCol = c + 1

    dfs(m, newRow, c, er, ec)
    dfs(m, r, newCol, er, ec)
}

var m = []
findPath(m)

m = [[]]
findPath(m)

m = [[0,0], [1,0]]
console.log(m)
findPath(m)

m = [[0,0], [0,0]]
console.log(m)
findPath(m)

m = [[0,0,0], [1,0,1], [0, 1, 0]]
console.log(m)
findPath(m)

m = [[0,0,0], [1,0, 0], [0, 1, 0]]
console.log(m)
findPath(m)

m = [[0,0,0,0], [1,0,0,0], [0, 1, 0,1], [0,0,0,0]]
console.log(m)
findPath(m)

m = [[0,0,0,0], [1,0,0,0], [0,1,0,1], [0,0,1,0]]
console.log(m)
findPath(m)

m = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
console.log(m)
findPath(m)


m = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0],[0,0,0,0,0]]
console.log(m)
findPath(m)

var length = 19
m = Array.from(Array(length), _ => Array(length).fill(0));
console.log(m)
findPath(m)



