package main

import "fmt"

func getDifferentDenominations(n int) {
    num := 0
    for n>0 {
        if n>= 419 {
            fmt.Println("419")
            n = n - 419
        } else if n>= 408 {
            fmt.Println("408")
            n = n - 408
        } else if n >= 186 {
            fmt.Println("186")
            n = n -186
        } else {
            fmt.Println("83")
            n = n - 83
        }
        num++
    }
    fmt.Println(n, num)
}

func getNumOfCoins(n int) int{
    num := 0
    //    fmt.Println()
    for n>0 {
        if n >= 2000{
            //      fmt.Println("2000")
            n = n - 2000
        } else if n >= 500{
            //            fmt.Println("500")
            n = n - 500
        } else if n >= 200{
            //            fmt.Println("200")
            n = n - 200
        }else if n >= 100{
            //            fmt.Println("100")
            n = n - 100
        } else if n >= 50{
            //            fmt.Println("50")
            n = n - 50
        } else if n >= 20{
            //            fmt.Println("20")
            n = n - 20
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

func coinsCalc(n int, denominations []int) int {
    numOfCoins := 0
    money := n
    for _, denomination := range denominations {
        numOfCoins += money/denomination
        money = money%denomination
    }
    return numOfCoins;
}

func main(){
    var n int
    fmt.Scan(&n)
    getDifferentDenominations(n)
    /*
    for i:=0; i<n; i++{

        //        coins := getNumOfCoins(i)
        coinsCalc(i, []int{2000,500,200,100,50,20,10,5, 2,1})

        //        if coins != coins_c{
        //            fmt.Println("Broke for", i)
        //            break;
        //        }
        //        fmt.Println(i, coins_c)
    }
    fmt.Println("New Algorithm Works")
    */
}
