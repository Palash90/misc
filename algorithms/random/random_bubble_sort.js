const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function bubbleSort(a) {
    for(var i = 0;i<a.length; i++){
        for(var j = 0; j<a.length; j++){
            if(a[j]>a[j+1]){
                var temp = a[j]
                a[j] = a[j+1]
                a[j+1]=temp
            }
        }
    }
}
console.log(numbers)
bubbleSort(numbers);
console.log(numbers);
