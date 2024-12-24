#include <stdio.h>
#include <time.h>

int fib(int n)
{
    if (n < 2)
    {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

int main()
{
    clock_t begin = clock();

    // printf("Fibonacci of 35: %d\n", fib(35));

    int n = 47;
    int fib[2];
    fib[0] = 0;
    fib[1] = 1;

    for (int i = 2; i < n; i++)
    {
        int f = fib[0] + fib[1];

        fib[0] = fib[1];
        fib[1] = f;
    }

    printf("Fibonacci of %d: %d", n, fib[1]);

    clock_t end = clock();
    double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;

    printf("\nDone. Took %lf seconds\n", time_spent);

    return 0;
}