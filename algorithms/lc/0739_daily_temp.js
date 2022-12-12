/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    var result = new Array(temperatures.length).fill(0)
    var stack = []

    for(var i = 0; i < temperatures.length; i++) {
        while(stack.length > 0 && stack[stack.length - 1][0] < temperatures[i]) {
            var [temp, stackIndex] = stack.pop()
            result[stackIndex] = i - stackIndex
        }  
        stack.push([temperatures[i], i])
    }
    return result
};
