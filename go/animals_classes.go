package main

import "fmt"

type Animal interface {
    Eat()
    Move()
    Speak()
}

type ConcreteAnimal struct {
    name, food, locomotion, sound string
}

type Bird ConcreteAnimal

type Snake ConcreteAnimal

type Cow ConcreteAnimal

func (cow Cow) Eat(){
    fmt.Println(cow.food)
}

func (cow Cow) Speak() {
    fmt.Println(cow.sound)
}

func (cow Cow) Move() {
    fmt.Println(cow.locomotion)
}

func (snake Snake) Eat(){
    fmt.Println(snake.food)
}

func (snake Snake) Speak() {
    fmt.Println(snake.sound)
}

func (snake Snake) Move() {
    fmt.Println(snake.locomotion)
}

func (bird Bird) Eat(){
    fmt.Println(bird.food)
}

func (bird Bird) Speak() {
    fmt.Println(bird.sound)
}

func (bird Bird) Move() {
    fmt.Println(bird.locomotion)
}


func main(){

    animalAction := make(map[string]Animal)
    for{
        var command, name, request string
        fmt.Printf(">")

        fmt.Scan(&command, &name, &request)

        if command == "newanimal" {
            var a Animal
            switch request {
            case "cow":
                c := Cow{name, "grass", "walk", "moo"}
                a = c
            case "snake":
                s := Snake {name, "mice", "slither", "hsss"}
                a = s
            case "bird":
                b := Bird {name, "worms", "fly", "peep" }
                a = b
            }
            animalAction[name]  = a
            fmt.Println("Created it!")
        }
        //        fmt.Println(animalAction)
        if command == "query" {
            switch request {
            case "eat":
                animalAction[name].Eat()
            case "speak":
                animalAction[name].Speak()
            case "move":
                animalAction[name].Move()
            }
        }
    }
}
