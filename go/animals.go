package main

import (
    "fmt"
    "os"
)

type Animal struct {
    food, locomotion, sound string
}

func (v Animal) Eat() {
    fmt.Println(v.food)
}

func (v Animal) Move() {
    fmt.Println(v.locomotion)
}

func (v Animal) Speak() {
    fmt.Println(v.sound)
}

func main() {
    animal_action := map[string]Animal{
        "cow":   Animal{"grass", "walk", "moo"},
        "bird":  Animal{"worms", "fly", "peep"},
        "snake": Animal{"mice", "slither", "hsss"},
    }

    for {

        fmt.Print(">")
        var animal, action string
        fmt.Scan(&animal, &action)
        cur_animal := (animal_action[animal])
        cur_ptr := &cur_animal

        switch action {
        case "eat":
            cur_ptr.Eat()
        case "move":
            cur_ptr.Move()
        case "speak":
            cur_ptr.Speak()
        default:
            os.Exit(0)
        }

    }
}

