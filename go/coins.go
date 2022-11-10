package main

import "fmt"

func getNumOfCoins(n int) int{
    num := 0
    //    fmt.Println()
    for n>0 {
        if n >= 500{
            //            fmt.Println("500")
            n = n - 500
        } else if n >= 100{
            //            fmt.Println("100")
            n = n - 100
        } else if n >= 50{
            //            fmt.Println("50")
            n = n - 50
        } else if n >= 10 {
            //            fmt.Println("10")
            n = n - 10
        } else if n >= 5 {
            //            fmt.Println("5")
            n = n - 5
        } else if n>= 2 {
            //            fmt.Println("2")
            n = n - 2
        } else {
            //            fmt.Println("1")
            n = n - 1
        }

        num++
    }
    //    fmt.Println()
    return num
}

func coinsCalc(n int) int {
    num500 := n/500
    num100 := (n%500)/100
    num50 := (n%100)/50
    num10 := (n%50)/10
    num5 := (n%10)/5
    num2 := (n%5)/2
    num1 := (n%5)%2
    num :=  num500 + num100 + num50 + num10 + num5 + num2 + num1

    //    fmt.Println("500", num500)
    //   fmt.Println("100", num100)
    // fmt.Println("50", num50)
    // fmt.Println("10", num10)
    // fmt.Println("5", num5)
    // fmt.Println("2", num2)
    // fmt.Println("1", num1)
    return num;
}

func main(){
    var n int
    fmt.Scan(&n)
    for i:=0; i<n; i++{

        coins := getNumOfCoins(i)
        coins_c := coinsCalc(i)

        if coins != coins_c{
            fmt.Println("Broke for", i)
            break;
        }
    }
    fmt.Println("New Algorithm Works")
}
