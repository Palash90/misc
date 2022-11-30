var titleToNumber = function(columnTitle) {
    var positions = columnTitle.split('')

    var columnNumber = 0

    for(var i = positions.length - 1; i >= 0; i--){
        var positionValue = positions[i].charCodeAt(0) - 64
        var positionWeight = Math.pow(26, positions.length - i - 1)

        console.log(i, positionValue, positionWeight, positions[i], positions.length - i)
        columnNumber += positionWeight * positionValue
    }
    return columnNumber
};

console.log(titleToNumber("AB"))
