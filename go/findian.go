package main

import 	"fmt"

func main() {
    var s string
    fmt.Println("Enter input")
    fmt.Scan(&s)
    lenS := len(s)
    if lenS < 3 {
        fmt.Println("Not Found!")
        return
    }
    isValidFirstCharacter := s[0] == 105 || s[0] == (105-32)
    isValidEndCharacter := (s[lenS-1] == 110) || (s[lenS-1] == (110 - 32))
    isValid := isValidFirstCharacter && isValidEndCharacter
    for i := 1; i < lenS-1; i++ {
        if s[i] == 97 || s[i] == (97-32) {
            if isValid {
                fmt.Println("Found!")
                return
            }
        }
    }
    fmt.Println("Not Found!")
    return
}
