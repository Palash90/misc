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
const findStepsMemoized = (n, steps, level, stepSequence, finalSteps) => {
    var calculatedSteps = {}
    findSteps(n, steps, level, stepSequence, finalSteps, calculatedSteps)
}
const findSteps = (n, steps, level, stepSequence, finalSteps) => {
    var levelIndentor = ""
    var indentor = level
    while(indentor > 0){
        levelIndentor += "    "
        indentor--
    }
    for(var i = 0; i<steps.length; i++) {
        var currentStep = steps[i]
        var remainingSteps = n - currentStep
        var nsq = [...stepSequence]
        if(remainingSteps >= 0){
            nsq.push(currentStep)
            //            console.log(levelIndentor, currentStep)
            findSteps(remainingSteps, steps, level + 1, nsq, finalSteps)
            if(remainingSteps === 0){
                //                console.log(levelIndentor, nsq)
                finalSteps.push(nsq)
            }
        }
    }
}
var finalSteps = []
findStepsMemoized(5, [1,2,3,4,5], 0,[], finalSteps)
console.log(finalSteps)
console.log("Total Possible Combinations", finalSteps.length)
