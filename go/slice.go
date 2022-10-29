package main

import (
    "fmt"
    "strconv"
)

func main() {
    var s []int = make([]int, 3)
    var input string
    k := 0
    fmt.Println("Initial slice",s)
    fmt.Println("Type an interger(X to exit):")
    for {
        fmt.Scanln(&input) 
        if input == "X"{
            break
        }
        ap,err:=strconv.Atoi(input)
        if err != nil {
            fmt.Println("Wrong input")
            continue
        }
        if k<3 {
            s[k] = ap
        }else{
            s = append(s, ap)
        }
        k++
        sortLength := 0
        if k<3{
            sortLength = k
        }else {
            sortLength = len(s)
        }
        for i:=0; i<sortLength;i++{
            for j:=0;j<sortLength;j++{
                if s[i] < s[j] {
                    temp := s[i]
                    s[i] = s[j]
                    s[j]=temp
                }
            }
        }
        fmt.Println("After insertion and sorting",s)
        fmt.Println("Please again enter an interger(X to exit):")
    }
}
