const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort(a) {
    for(var i = 0; i<a.length; i++){
        var minIndex = i
        for(var j = i+1; j<a.length; j++){
            if(a[j] < a[minIndex]){
                minIndex = j
            }
        }

        var temp = a[i]
        a[i] = a[minIndex]
        a[minIndex] = temp
    }
}

console.log(numbers)
selectionSort(numbers);
console.log(numbers)
