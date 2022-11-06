package main

import "fmt"

func main(){
    var n int
    fmt.Scan(&n)

    a := make([]int64, n)

    for i := 0; i < n; i++ {
        fmt.Scan(&a[i])
    }

    //    fmt.Println(a)

    max_index := 0

    for i := 0; i < n; i++ {
        if a[i] > a[max_index] {
            max_index = i
        }
    }

    max_index2 := -1

    for i :=0; i < n; i++ {
        //      fmt.Println("Max Index is", max_index, "current index", i, "max number", a[max_index], "previous second max_index", max_index2)
        //        fmt.Println(a[i] >= a[max_index],  a[i] >= a[max_index2],  i != max_index, a[i] >= a[max_index] && a[i] >= a[max_index2] && i != max_index )
        if i != max_index && (max_index2 == -1 || a[i] >= a[max_index2]) {
            max_index2 = i
        }
    }

    //    fmt.Println(max_index, max_index2)
    fmt.Println(a[max_index] * a[max_index2])
}
