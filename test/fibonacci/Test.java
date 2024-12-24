public class Test {
    public static int fib(int n) {
        if (n < 2) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        long startTime = System.nanoTime();

        // System.out.println("Fibonacci of 35: " + fib(35));

        int n = 100;
        int[] fib = { 0, 1 };

        for (int i = 2; i < n; i++) {
            int f = fib[0] + fib[1];
            fib[0] = fib[1];
            fib[1] = f;
        }

        System.out.println("Fibonacci of " + n + ": " + fib[1]);

        long endTime = System.nanoTime();
        long duration = endTime - startTime;
        System.out.println("Execution time in milliseconds: " + duration / 1000000);

    }
}
