package main

import "fmt"

func GetInput(v *float64, name string){
    fmt.Println("Please enter", name);
    fmt.Scan(v)
}

func GenDisplaceFn(a, v, s float64) func(float64) float64{
    return func (t float64) float64{
        return (a * t * t) / 2.0 + v*t + s
    }
}

func main(){
    var a, v0, t, s0 float64;

    GetInput(&a, "acceleration")
    GetInput(&v0, "initial velocity")
    GetInput(&s0, "initial displacement")
    GetInput(&t, "time")

    fn := GenDisplaceFn(a, v0, s0)

    fmt.Printf("Displacement at t= %f : %f\n", t, fn(t))
    fmt.Printf("Displacement at t= %f : %f\n", 3.0, fn(3.0))
    fmt.Printf("Displacement at t= %f : %f\n", 5.0, fn(5.0))

}
