
const getArray = (nums, target) => {
    let result = []
    const getSubArray = (subNums, newTarget, existing) => {
        //        console.log("Input to getSubArray", subNums, newTarget, existing)

        if(newTarget === 0){
            //            console.log("Adding to the results", existing)
            //            console.log()
            result.push(existing)
            return
        }

        if(newTarget < 0){
            //            console.log("No further solution possible")
            return
        }

        //        console.log()

        for(var i=0; i<subNums.length;i++){
            getSubArray(subNums.slice(i), newTarget - subNums[i], [...existing,subNums[i]])
        }
    };


    getSubArray(nums, target, [])
    return result
}

console.log([2,3,5], 10, "\t\t ->",getArray([2,3,5], 10))
console.log()
console.log([2,2,3,5], 7, "\t\t ->",getArray([2,2,3,5], 7))
console.log()
console.log([2,3,5], 12, "\t\t ->",getArray([2,3,5], 12))




