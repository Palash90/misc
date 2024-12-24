function fib(n) {
    if (n < 2) {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

function fib_i(n) {
    var fib = [0, 1]
    for (var i = 2; i < n; i++) {
        f = fib[0] + fib[1];

        fib[0] = fib[1]

        fib[1] = f;
    }

    return fib[1]
}
console.time('Elapsed:')
console.log("Fibonacci of 500: ", fib_i(500))
console.timeEnd('Elapsed:')
