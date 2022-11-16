var moveCounter = 0;
function move(n, source, auxiliary, dest) {
    if(n === 0){
        return
    }
    if(n === 1){
        console.log("Moving", n, "from", source, "to", dest)
        moveCounter++
        return
    }
    move(n-1, source, dest, auxiliary);
    console.log("Moving", n, "from", source, "to", dest)
    moveCounter++
    move(n-1, auxiliary, source, dest)

}

for(var i = 0; i <= 10101010101010101010; i++){
    moveCounter = 0;
    move(i, 'S', 'A', 'D')
    console.log("Number of disks", i, "Total move", moveCounter)
}
