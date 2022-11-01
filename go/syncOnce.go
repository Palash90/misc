package main

import "fmt"
import "sync"

var on sync.Once
var wg sync.WaitGroup

func setup(){
    fmt.Println("Init")
}

func call(){
    //    on.Do(setup)
    setup()
    fmt.Println("hello")
    wg.Done()
}

func main (){
    wg.Add(2)
    go call()
    go call()
    wg.Wait()
}


