import java.util.Scanner;

class Dummy {
    int id;

    public Dummy(int id) {
        this.id = id;
    }
}

public class Test {
    public static void main(String[] args) {
        int count = 10_000_000;

        Scanner scanner = new Scanner(System.in);
        System.out.println("Check memory now before allocating objects");
        scanner.nextLine();

        long startTime = System.nanoTime();

        Dummy[] v = new Dummy[count];
        for (int i = 0; i < count; i++) {
            v[i] = new Dummy(i);
        }

        long endTime = System.nanoTime();

        long duration = endTime - startTime;
        System.out.println("Execution time in milliseconds: " + duration/1000000);

        scanner = new Scanner(System.in);
        System.out.println("Check memory now after allocating objects");
        scanner.nextLine();
    }
}
