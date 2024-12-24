import time

def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

def fib_i(n):
    fib = [0, 1]

    for i in range(2,n, 1):
        f = fib[0] + fib[1]
        fib[0] = fib[1]
        fib[1] = f
    
    return fib[1]

start_time = time.time()

print("Fibonacci of 45: ", fib_i(5000))
print("Took %s seconds to calculate" % (time.time() - start_time))