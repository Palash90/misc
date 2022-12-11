/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a,b) => a[0] -b[0])    
    var result = []
    var maxTillNow = intervals[0][1]

    var minTillNow = intervals[0][0]
    console.log(intervals, minTillNow, maxTillNow)
    for(var i = 0; i < intervals.length - 1; i++) {
        var currentElement = intervals[i]
        var nextElement = intervals[i+1]

        if(currentElement[0] < minTillNow){
            minTillNow = currentElement[0]
        }
        console.log("MinTillNow", minTillNow)
        if(nextElement[0] <= currentElement[1]){
            var tempMax = nextElement[1] > currentElement[1] ? nextElement[1] : currentElement[1]
            maxTillNow = tempMax>maxTillNow?tempMax:maxTillNow
        } else {
            result.push([minTillNow, maxTillNow])
            minTillNow = nextElement[0]
            maxTillNow = nextElement[1]
        }

        console.log("Checking", currentElement, "Min till now", minTillNow, "Max till now", maxTillNow)

    }
    result.push([minTillNow, maxTillNow])
    return result
};


var intervals = [[0,2],[1,3],[2,3],[5,6],[4,9]]
console.log(merge(intervals))
//console.log(intervals)

intervals = [[1,3],[2,6],[8,10],[15,18]]
console.log(merge(intervals))
//console.log(intervals)

intervals = [[1,4],[4,5]]
console.log(merge(intervals))

intervals = [[2,3],[4,5],[6,7],[8,9],[1,10]]
console.log(merge(intervals))
