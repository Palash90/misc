function move(n, source, auxiliary, dest) {
    if(n === 1){
        console.log("Moving", n, "from", source, "to", dest)
        return
    }
    move(n-1, source, dest, auxiliary);
    console.log("Moving", n, "from", source, "to", dest)
    move(n-1, auxiliary, source, dest)

}

move(4, 'S', 'A', 'D')
