public class Stack {
    private int[] stackArray;
    private int top;
    private int capacity;

    // Constructor to initialize the stack with a given capacity
    public Stack(int capacity) {
        this.capacity = capacity;
        stackArray = new int[capacity];
        top = -1; // Indicates the stack is initially empty
    }

    // Returns the number of elements in the stack
    public int size() {
        return top + 1;
    }

    // Returns true if the stack is empty, false otherwise
    public boolean isEmpty() {
        return top == -1;
    }

    // Returns the top element of the stack (without removing it)
    public int top() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        return stackArray[top];
    }

    // Adds an element to the top of the stack
    public void push(int element) {
        if (size() == capacity) {
            throw new IllegalStateException("Stack overflow: Stack is full");
        }
        stackArray[++top] = element; // Increment top and add the element
    }

    // Removes the top element from the stack
    public void pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack underflow: Stack is empty");
        }
        top--; // Simply decrement the top index
    }

    // Main method for testing the stack
    public static void main(String[] args) {
        Stack stack = new Stack(5); // Stack with a capacity of 5

        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Stack size: " + stack.size()); // Output: 3
        System.out.println("Top element: " + stack.top()); // Output: 30
        stack.pop();
        System.out.println("Top element after pop: " + stack.top()); // Output: 20
        System.out.println("Stack size after pop: " + stack.size()); // Output: 2

        System.out.println("Is stack empty? " + stack.isEmpty()); // Output: false

        // Trying to pop all elements to make it empty
        stack.pop();
        stack.pop();

        System.out.println("Is stack empty now? " + stack.isEmpty()); // Output: true

        // Uncomment the next line to see an error (stack underflow)
        // stack.pop(); // Will throw an exception since the stack is empty
    }
}
