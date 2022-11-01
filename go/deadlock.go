package main

import "fmt"
import "sync"
import "time"

var wg sync.WaitGroup

func normalThread() {
    i := 0
    for{
        fmt.Println("Infinite for loop", i)
        i++
        time.Sleep(1000 * time.Millisecond)
    }
}

func sendReceive(c1 chan int, c2 chan int, index int, firstChannelName string, secondChannelName string) {

    fmt.Println("Thread", index, "receiving data on", firstChannelName)
    a := <- c1
    fmt.Println("Thread", index, "received", a)
    fmt.Println("Thread", index, "writing to", secondChannelName);
    c2 <- 1
    wg.Done()
}

func main() {
    ch1 := make(chan int)
    ch2 := make (chan int)
    wg.Add(3)

    go     sendReceive(ch1, ch2, 1, "ch1", "ch2")
    go    sendReceive(ch2, ch1, 2, "ch2", "ch1")
    go normalThread()

    wg.Wait()
    fmt.Println("Main completed")
}
