const rotateMatrix = (a) => {
    var result = new Array(a.length).fill(0).map(() => new Array(a.length).fill(0))

    for(var i = 0; i<a.length; i++){
        for(var j = 0; j<a.length; j++){
            result[a.length - j-1][i] = a[i][j]
        }
    }

    return result
}

var a = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]

var rotated90 = rotateMatrix(a)
var rotated180 = rotateMatrix(rotated90)
var rotated270 = rotateMatrix(rotated180)
var rotated360 = rotateMatrix(rotated270)

console.log(rotated360)

a = [['a', 'b', 'c','d','e'],['f','g','h','i','j'],['k','l','m','n','o'],['p','q','r','s','t'],['u','v','w','x','y']]

rotated90 = rotateMatrix(a)
rotated180 = rotateMatrix(rotated90)
rotated270 = rotateMatrix(rotated180)
rotated360 = rotateMatrix(rotated270)


console.log(rotated360)

