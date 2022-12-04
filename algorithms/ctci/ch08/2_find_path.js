const findPath = (m) => {
    if(m.length === 0) {
        return false
    }

    if(m[0].length === 0) {
        return false
    }

    reachable = 0
    var path = []
    console.log("Trying to find paths for",m,path)
    dfs(m, m.length - 1, m[0].length - 1, 0, 0, path)
    console.log(path)
    console.log("**************************************")
    console.log()
}

const dfs = (m, r, c, er, ec, path) => {
    if(r < 0 || c < 0) {
        return false
    }

    if(m[r][c] === 1) {
        return false
    }

    if(r === er && c === ec) {
        path.push([r,c]) 
        return true
    }

    var success = false

    if(dfs(m, r-1, c, er, ec, path)) {
        path.push([r,c])
        success = true
    }

    if(dfs(m, r, c-1, er, ec, path)) {
        path.push([r,c])
        success = success || true
    }

    return success
}

function uniquePaths(m) {
    var cache = Array.from(Array(m.length), _ => Array(m[0].length).fill(-1));
    console.log(m, cache)
    return uniquePathsHelper(m.length - 1, m[0].length - 1, cache);
}

function uniquePathsHelper(m, n, cache) {
    if (m < 0 || n < 0) {
        return 0;
    } else if (m == 0 || n == 0) {
        return 1;
    } else if (cache[m][n] !== -1) {
        return cache[m][n]
    } else {
        cache[m][n] = uniquePathsHelper(m - 1, n, cache) + uniquePathsHelper(m, n - 1, cache);
        return cache[m][n]
    }
}

var m = []
findPath(m)

m = [[]]
findPath(m)

m = [[0,0], [1,0]]
findPath(m)
//console.log("LC Solution",m,uniquePaths(m))

m = [[0,0], [0,0]]
findPath(m)
//console.log("LC Solution",m,uniquePaths(m))

m = [[0,0,0], [1,0,1], [0, 1, 0]]
findPath(m)
//console.log("LC Solution",m,uniquePaths(m))

m = [[0,0,0], [1,0, 0], [0, 1, 0]]
findPath(m)
//console.log("LC Solution",m,uniquePaths(m))

m = [[0,0,0,0], [1,0,0,0], [0, 1, 0,1], [0,0,0,0]]
findPath(m)
//console.log("LC Solution",m,uniquePaths(m))

m = [[0,0,0,0], [1,0,0,0], [0,1,0,1], [0,0,1,0]]
findPath(m)
//console.log("LC Solution",m,uniquePaths(m))

m = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
findPath(m)
//console.log("LC Solution",m,uniquePaths(m))


m = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0],[0,0,0,0,0]]
//findPath(m)
//console.log("LC Solution",m,uniquePaths(m))

var length = 19
m = Array.from(Array(length), _ => Array(length).fill(0));
//findPath(m)



