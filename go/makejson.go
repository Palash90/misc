package main

import "fmt"
import "encoding/json"

func main() {
    var name string
    var address string
    addrMap:=make( map[string]string)

    fmt.Println("Enter your name")
    fmt.Scanf("%s", &name)
    fmt.Println("Enter your address")
    fmt.Scanf("%s",&address)

    addrMap["name"]  = name
    addrMap["address"] = address
    fmt.Println(addrMap)

    marshalled, _ := json.Marshal(addrMap)

    fmt.Println(marshalled)
    fmt.Println(string(marshalled))
}

