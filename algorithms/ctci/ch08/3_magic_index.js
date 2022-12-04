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

    if(a[mid] === mid) {
        return mid
    } else if(a[mid] > mid) {
        return magicIndex(a, low, mid -1)
    } else {
        return magicIndex(a, mid + 1, high)
    }
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

