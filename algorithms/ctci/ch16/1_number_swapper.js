const numberSwapper = (a,b) => {
    console.log("Before swapping", a, b)
    a = a + b
    b = a - b
    a = a - b
    console.log("After swapping", a, b)
    console.log()
}


numberSwapper(2,3)
numberSwapper(3.2, 4.9)
numberSwapper(-3.2, -4.9)
numberSwapper(3.2, -4.9)
numberSwapper(Number.MAX_VALUE - 1, 1)

