package main

import "fmt"

func getNumOfCoins(n int) int{
    num := 0
    fmt.Println()
    for n>0 {
        if n >= 500{
            fmt.Println("500")
            n = n - 500
        } else if n >= 100{
            fmt.Println("100")
            n = n - 100
        } else if n >= 50{
            fmt.Println("50")
            n = n - 50
        } else if n >= 10 {
            fmt.Println("10")
            n = n - 10
        } else if n >= 5 {
            fmt.Println("5")
            n = n - 5
        } else if n>= 2 {
            fmt.Println("2")
            n = n - 2
        } else {
            fmt.Println("1")
            n = n - 1
        }

        num++
    }
    fmt.Println()
    return num
}


func main(){
    var n int
    fmt.Scan(&n)
    fmt.Println(getNumOfCoins(n))
}
