import pkg.Test;
import pkg.TestFactory;

public class main {
    public static void main(String[] args) {
        Test test = TestFactory.get();
        test.say();

        // The following line will cause an error as the consturctor of Test is not accessible outside of package.
        // So we are stuck with the factory class.
        Test test1 = new Test();
        test1.say();
    }
}
