class Node {
    int data;
    Node next;
    Node down;

    Node(int data) {
        this.data = data;
        this.next = null;
        this.down = null;
    }
}

public class FlattenLinkedList {

    // Function to merge two sorted linked lists
    Node merge(Node a, Node b) {
        if (a == null) return b;
        if (b == null) return a;

        // Compare the data in a and b, and recursively merge
        Node result;
        if (a.data < b.data) {
            result = a;
            result.down = merge(a.down, b);
        } else {
            result = b;
            result.down = merge(a, b.down);
        }

        return result;
    }

    // Function to flatten the 2D linked list
    Node flatten(Node root) {
        // Base case: If root is null or there's no next list, return root
        if (root == null || root.next == null) {
            return root;
        }

        // Recursively flatten the next linked list
        root.next = flatten(root.next);

        // Merge the current vertical list with the next flattened list
        root = merge(root, root.next);

        // Since we are flattening down, set 'next' to null
        root.next = null;

        return root;
    }

    // Helper function to print the flattened linked list
    void printList(Node root) {
        Node temp = root;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.down;
        }
        System.out.println("null");
    }

    public static void main(String[] args) {
        FlattenLinkedList list = new FlattenLinkedList();

        // Creating test case for vertical and horizontal lists
        Node root = new Node(5);
        root.down = new Node(7);
        root.down.down = new Node(8);
        root.down.down.down = new Node(30);

        root.next = new Node(10);
        root.next.down = new Node(20);

        root.next.next = new Node(19);
        root.next.next.down = new Node(22);
        root.next.next.down.down = new Node(50);

        root.next.next.next = new Node(28);
        root.next.next.next.down = new Node(35);
        root.next.next.next.down.down = new Node(40);
        root.next.next.next.down.down.down = new Node(45);

        // Flatten the list and print the result
        root = list.flatten(root);
        list.printList(root);
    }
}
