/**
 * Put into a plotly bar codepen
 * @param {*} n 
 * @returns 
 */
function toss(n) {
    var result = []
    for(var i = 0; i< n; i++){
      var values = [0, 1, 2]
      var randomElement = Math.floor(Math.random() * values.length)
      result.push(randomElement)
    }
    return result
}

function run(n, d){
	var result = {}
	for (var i = 0; i<=d; i++){
		result[i] = 0
  }
	for (var i = 0; i <n; i++){
		var t = toss(d) 
		var numOfOne = t.filter(x => x==1).length
    result[numOfOne] = result[numOfOne] + 1
  }
  return result
}

var result = run(100000, 10)
var data = [
  {
    x: Object.keys(result),
    y: Object.values(result),
    type: 'bar'
  }
];


Plotly.newPlot('myDiv', data);

