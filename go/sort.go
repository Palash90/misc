package main

import "fmt"
import "sort"

func my_sort(arr [3]int, routineIndex int, c chan []int){
    fmt.Println("Input array to routine", routineIndex, arr)
    sort.Ints(arr[:])
    fmt.Println("Sending sorted array on channel", arr, "from routine", routineIndex)
    c <- arr[:]
}
func main(){
    var numbers [12]int
    c := make(chan []int)
    final := make([]int, 0)

    fmt.Println("Enter 12 integer numbers")

    fmt.Scan(&numbers[0])
    fmt.Scan(&numbers[1])
    fmt.Scan(&numbers[2])
    fmt.Scan(&numbers[3])
    fmt.Scan(&numbers[4])
    fmt.Scan(&numbers[5])
    fmt.Scan(&numbers[6])
    fmt.Scan(&numbers[7])
    fmt.Scan(&numbers[8])
    fmt.Scan(&numbers[9])
    fmt.Scan(&numbers[10])
    fmt.Scan(&numbers[11])

    fmt.Println("Input Numbers", numbers)
    fmt.Println()

    var arr0, arr1, arr2, arr3 [3]int

    copy(arr0[:], numbers[:3])
    copy(arr1[:], numbers[3:6])
    copy(arr2[:], numbers[6:9])
    copy(arr3[:], numbers[9:12])

    go my_sort(arr0, 0, c)
    go my_sort(arr1, 1, c)
    go my_sort(arr2, 2, c)
    go my_sort(arr3, 3, c)

    w := <- c
    x := <- c
    y := <- c
    z := <- c

    fmt.Println()
    fmt.Println("Array segments from routines")
    fmt.Println(w, x, y, z)

    final =    append(final, w[0])
    final =    append(final, w[1])
    final =    append(final, w[2])
    final =    append(final, x[0])
    final =    append(final, x[1])
    final =    append(final, x[2])
    final =    append(final, y[0])
    final =    append(final, y[1])
    final =    append(final, y[2])
    final =    append(final, z[0])
    final =    append(final, z[1])
    final =    append(final, z[2])

    sort.Ints(final)

    fmt.Println("\nSorting finished", final)
}
