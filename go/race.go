package main

import "fmt"

func main() {
    // At some point the following block will end up in Divide By Zero error. Because, all threads are trying to manipulate x and y.
    for {
        // This potion will try to set x and y to zero
        var x, y int
        fmt.Println("x and y re-initialized to", x, y)
        // The following go routine will set the x to 60
        go func(v *int) {
            fmt.Println("Set x thread")
            *v = 60
            fmt.Println("x is set to", x)
        }(&x)

        // This thread will set y to 3
        go func(v *int) {
            fmt.Println("Set y thread");
            *v = 3
            fmt.Println("y is set to", y)
        }(&y)

        // This will read the data of x and y and print the division result
        go func(v1 int, v2 int) {
            fmt.Println("Division thread, v1 is", v1, "v2 is", v2);
            // The following line will throw Divide by Zero error
            fmt.Println("Division result:", v1 / v2)
        }(x, y)

    }
}


