package main

import (
    "fmt"
    "strconv"
)

func main() {
    var s []int = make([]int, 3)
    var input string
    fmt.Println("Initial slice",s)
    k := 0
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
        if k<=2{
            s[k] = ap
        }else{
            s = append(s, ap)
        }
        k++
        fmt.Println("After insertion", s, "length of slice is", len(s))
        for i:=0; i<len(s);i++{
            for j:=0;j<len(s);j++{
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
