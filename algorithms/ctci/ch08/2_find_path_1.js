const findPath = (m) => {
    if(!m || m.length === 0){
        return null
    }

    var path = []
    var cache = {}
    var lastRow = m.length - 1
    var lastCol = m[0].length - 1

    if(getPath(m, lastRow, lastCol, path, cache)) {
        console.log("Grid",m, "paths", path)
        return path
    }

    return null
}

const getPath = (m, row, col, path, cache) => {
    if(col < 0 || row < 0 || m[row][col] === 1) {
        return false
    }

    var isAtOrigin = (row === 0) && (col === 0)
    var success = true

    if(isAtOrigin || getPath(m, row, col - 1, path, cache) || getPath(m, row - 1, col, path, cache)) {
        path.push([row, col])
        success = true
    }

    return success
}

var m = []
findPath(m)

m = [[]]
findPath(m)

m = [[0,0], [1,0]]
findPath(m)

m = [[0,0], [0,0]]
findPath(m)

m = [[0,0,0], [1,0,1], [0, 1, 0]]
findPath(m)

m = [[0,0,0], [1,0, 0], [0, 1, 0]]
findPath(m)

m = [[0,0,0,0], [1,0,0,0], [0, 1, 0,1], [0,0,0,0]]
findPath(m)

m = [[0,0,0,0], [1,0,0,0], [0,1,0,1], [0,0,1,0]]
findPath(m)

m = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
findPath(m)


m = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0],[0,0,0,0,0]]
findPath(m)



