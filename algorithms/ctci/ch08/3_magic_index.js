const findMagicIndex = (a) => {
    console.log(a)
    console.log(magicIndex(a, 0, a.length - 1))
    console.log()
}

const magicIndex = (a, low, high) => {
    if(low > high) {
        return - 1
    }

    var mid = Math.floor((low + high) / 2)
    var midValue = a[mid]

    if(mid === midValue) {
        return mid
    }

    var leftIndex = Math.min(mid - 1, midValue)
    var left = magicIndex(a, low, leftIndex)
    if(left >= 0) {
        return left
    }

    var rightIndex = Math.max(mid + 1, midValue)
    var right = magicIndex(a, rightIndex, high)
    return right 
}

var a = [-2, -1, 0, 3, 5, 6]
findMagicIndex(a)

a = [-2, 1, 3, 5, 6]
findMagicIndex(a)

a = [-2, 0, 1, 3, 6]
findMagicIndex(a)

a = [1, 2, 2, 3, 4, 5]
findMagicIndex(a)

a = [-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]
findMagicIndex(a)

a = [-10, -5, 2, 2, 2, 3, 4, 8, 9, 12, 13]
findMagicIndex(a)

