var imageLength = 20
const fill = (image, oc, nc, sr, sc) => {
    if(sr < 0 || sr >= image.length || sc < 0 || sc >= image[0].length) {
        return
    }

    if(image[sr][sc] === oc) {
        image[sr][sc] = nc
        fill(image, oc, nc, sr - 1, sc)
        fill(image, oc, nc, sr + 1, sc)
        fill(image, oc, nc, sr, sc - 1)
        fill(image, oc, nc, sr, sc + 1)	
    }
}
const printImage = (image) => {
    for(var i = 0; i<image.length; i++) {
        var s = ""
        for(var j = 0; j<image[i].length; j++){
            if(image[i][j] === 1){
                s+="*"
            } else if(image[i][j] === 2) {
                s+="X"
            } else if(image[i][j] === 3) {
                s+="-"
            } else {
                s+="$"
            }
            s+="\t"
        }
        console.log(s)
    }   
    console.log()
    console.log()
}
var image = [
    [1,1,1,1,1],
    [1,3,3,3,1],
    [1,3,4,3,1],
    [1,3,3,3,1],
    [1,1,1,1,1]
]
printImage(image)
fill(image, 1, 2, 0, 0)
printImage(image)

image = [
    [1,1,1,1,1],
    [1,3,3,3,1],
    [1,3,1,1,1],
    [1,3,3,3,1],
    [1,1,1,1,1]
]
printImage(image)
fill(image, 1, 2, 0, 0)
printImage(image)

image = [
    [1,1,1,1,1],
    [1,3,3,3,1],
    [1,3,4,3,1],
    [1,3,3,3,1],
    [1,1,1,1,3]
]
printImage(image)
fill(image, 1, 2, 0, 0)
printImage(image)

