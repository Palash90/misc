package main

import (
    "fmt"
    "time"
)

func naive_gcd(a uint, b uint) uint {
    best := uint(0)
    var smaller uint

    if a < b{
        smaller = a
    }else{
        smaller = b
    }

    for i := uint(1); i <= smaller; i++ {
        if a % i == 0 && b % i == 0 {
            best = i
        }
    }

    return best;
}

func gcd(a uint, b uint) uint {
    if b == 0 {
        return a
    } else {
        return gcd(b, a % b)
    }
}

func main(){
    var a, b uint;

    fmt.Scan(&a)
    fmt.Scan(&b)

    start := time.Now()

    fmt.Println("GCD of a and b is", naive_gcd(a, b))

    fmt.Println("Naive algorithm took", time.Since(start))

    fmt.Println()
    start = time.Now()

    fmt.Println("GCD of a and b is", gcd(a, b))

    fmt.Println("Naive algorithm took", time.Since(start))

}
