const zeroMatrix = (m) => {
    printMatrix(m)
    var zeroRows = new Set()
    var zeroCols = new Set()

    var rows = m.length;
    var cols = m[0]?m[0].length:0

    for(var i = 0; i<rows; i++){
        for(var j = 0; j<cols; j++){
            if(m[i][j] === 0){
                zeroRows.add(i)
                zeroCols.add(j)
            }
        }
    }

    for(var i = 0; i<rows; i++){
        for(var j = 0; j<cols; j++){
            if(zeroRows.has(i) || zeroCols.has(j)) {
                m[i][j] = 0
            }
        }
    }

    printMatrix(m)
}

const printMatrix = (m) =>{
    var rows = m.length;
    var cols = m[0]?m[0].length:0


    for(var i = 0; i<rows; i++){
        var s = ""
        for(var j = 0; j<cols; j++){
            s += m[i][j]+"\t"
        }
        console.log(s)
    }
    console.log()
}

var m = [[1,2],[3,4]]
zeroMatrix(m)

m = [[1,2,3],[4,0,6]]
zeroMatrix(m)

m = [[1,2,3],[4,0,6],[7,8,9]]
zeroMatrix(m)

m = [[1,2,3],[4,5,0], [7,8,9]]
zeroMatrix(m)

m = [[0,2,3],[4,5,0], [7,8,9]]
zeroMatrix(m)

m = [[0,2,3],[4,5,6], [7,8,0]]
zeroMatrix(m)

m=[]
zeroMatrix(m)

m=[[1]]
zeroMatrix(m)
