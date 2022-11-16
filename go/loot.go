package main

import "fmt"
import(
    "bufio"
    "os"
    "strconv"
    "strings"
)

func maxIndex(items[] int) int {
    max := items[0] 
    maxIndex := 0
    for index, item := range items {
        if item>max {
            max = item
            maxIndex = index
        }
    }
    return maxIndex 
}

func min(item1 int, item2 int) int {
    if item1<item2{
        return item1
    } else {
        return item2
    }
}

func maximise(capacity int, price []int, weight []int) float64 {
    if capacity == 0 || len(weight) == 0{
        return 0
    }

    var lootValue float64

    maxIndex := maxIndex(price)
    //  fmt.Println(weight, price, maxIndex)
    amount := min(capacity, weight[maxIndex])

    lootValue = float64(price[maxIndex] * amount)

    capacity -= amount

    //    fmt.Println("Gathered", maxIndex, price[maxIndex], weight[maxIndex])

    var newWeight = make([]int, len(weight) -1)
    var newPrice = make([]int, len(price) - 1)

    for i := 0; i<len(weight)-1;i++{
        if(i != maxIndex){
            newWeight[i] = weight[i]
            newPrice[i] = price[i]
        }
    }

    //    fmt.Println("Altered",  newPrice, newWeight)
    //    fmt.Println()
    return lootValue + maximise(capacity, newPrice, newWeight)
}

func numbers(s string) []int {
    var n []int
    for _, f := range strings.Fields(s) {
        i, err := strconv.Atoi(f)
        if err == nil {
            n = append(n, i)
        }
    }
    return n
}

func main() {
    var n, capacity int

    fmt.Scan(&n)
    fmt.Scan(&capacity)

    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    price := numbers(scanner.Text())
    scanner.Scan()
    weight := numbers(scanner.Text())

    fmt.Println(maximise(capacity, price, weight))
}
