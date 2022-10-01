function findMissing(arr, size) {
    var tempArr = [];

    for (var i = 0; i < size; i++) {
        tempArr[i] = -1;
    }

    for (var i = 0; i < arr.length; i++) {
        tempArr[arr[i]] = arr[i];
    }

    var ans;
    for (var i = 0; i < size; i++) {
        if (tempArr[i] === -1) {
            ans = i;
            break;
        }
    }

    console.log(tempArr, ans);
}

// Following approach does not work when you have numbers start from 0
function findMissingOptimized(arr, size) {
    let i;
    for (i = 0; i < size; i++) {
        if (Math.abs(arr[i]) - 1 == size) {
            continue;
        }
        let ind = Math.abs(arr[i]) - 1;
        arr[ind] *= -1;
    }

    let ans = size + 1;
    for (i = 0; i < size; i++) {
        if (arr[i] > 0)
            ans = i + 1;
    }

    console.log(arr, ans);
}

function findMissingByMath(arr, size) {
    var max = Number.MIN_SAFE_INTEGER;
    var arrSum = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        arrSum += arr[i];
    }

    var expectedSum = max * (max + 1) / 2;
    console.log(expectedSum - arrSum);
}

// Driver code
let arr = [1, 3, 7, 5, 6, 2];
let n = arr.length;

// Function call
findMissing(arr, n);
arr = [1, 3, 7, 5, 6, 2];
findMissingOptimized(arr, n);
arr = [1, 3, 7, 5, 6, 2];
findMissingByMath(arr, n);

arr = [3, 0, 1]
findMissing(arr, n);
arr = [3, 0, 1]
findMissingOptimized(arr, n);
arr = [3, 0, 1]
findMissingByMath(arr, n);