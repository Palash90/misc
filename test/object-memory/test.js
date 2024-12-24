const readline = require('node:readline');

var v = [];
var count = 10_000_000

console.time('Elapsed:')
for(var i = 0; i < count; i++){
    v.push({id: i});
}
console.timeEnd('Elapsed:')

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(``, name => {
    rl.close();
  });