const countWaysMemo = (n) => {
    var countsTracker = {}
    return countWays(n, countsTracker)
}

const countWays = (n, countsTracker) => {
    if(countsTracker[n]){
        return countsTracker[n]
    }

    if(n < 0) {
        return 0
    } else if(n === 0) {
        return 1
    } else {
        var count = countWays(n-1, countsTracker) + countWays(n-2, countsTracker) + countWays(n-3, countsTracker)
        countsTracker[n] = count
        return count
    }
}

console.log(countWaysMemo(35))
