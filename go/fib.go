package main

import "fmt"
import "time"

func fib(n uint) uint {

    if n > 40 {
        fmt.Println("Naive algorithm cannot calculate more than 40")
        return 0
    }

    if n <= 1 {
        return n
    } else {
        return fib(n-1) + fib(n-2)
    }
}

func fib_fast(n uint) uint {

    f := make([]uint, n + 1)

    f[0] = 0
    f[1] = 1

    for i := uint(2); i <= n; i++ {
        f[i] = f[i - 1] + f[i - 2]
    }

    return f[n]
}

func main(){
    var n uint

    fmt.Scan(&n)

    fib_time := time.Now()

    fmt.Println("Fibonacci of", n, "is", fib(n))

    fmt.Println("Naive Algorithm Executed in", time.Since(fib_time))

    fmt.Println()

    fib_time = time.Now()

    fmt.Println("Fibonacci of", n, "is", fib_fast(n))

    fmt.Println("Fast Fibonacci Executed in", time.Since(fib_time))
}
