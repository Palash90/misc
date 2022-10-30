package main

import (
    "fmt"
    "os"
    "strings"
    "bufio"
)

type Name struct {
    fname string
    lname string
}

func main() {

    var fileName string
    names := make([]Name, 0, 5)
    fmt.Printf("Enter file: ")
    fmt.Scanln(&fileName)
    f, err := os.Open(fileName)
    if err != nil {
        fmt.Printf("Could not open file")
    }
    scanner := bufio.NewScanner(f)
    for scanner.Scan() {
        line := scanner.Text()
        fields := strings.Split(line, " ")
        //        fmt.Println(fields)
        if len(fields) >= 2 {
            var name Name
            name.fname = fields[0]
            name.lname = fields[1]
            names = append(names, name)
        }
    }
    if err := scanner.Err(); err != nil {
        fmt.Printf("Scan error!")
    }

    fmt.Println()
    fmt.Println("Names in the file")
    for _, name := range names {
        fmt.Printf("%s %s\n", name.fname, name.lname)
    }
    f.Close()
}
