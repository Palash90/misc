import java.util.HashMap;

class LRUCache {
    class Node {
        int key, value;
        Node prev, next;

        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private HashMap<Integer, Node> cache;
    private Node head, tail;
    private int capacity, size;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.cache = new HashMap<>();
        
        // Dummy head and tail nodes to avoid null checks
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head.next = tail;
        tail.prev = head;
    }

    // Retrieve the value of the key if it exists in the cache
    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) {
            return -1; // Key not found
        }
        // Move the accessed node to the front (most recently used)
        moveToHead(node);
        return node.value;
    }

    // Add or update the key-value pair
    public void add(int key, int value) {
        Node node = cache.get(key);

        if (node == null) {
            // If the key doesn't exist, create a new node
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addToHead(newNode);
            size++;

            // If the cache exceeds capacity, remove the least recently used item
            if (size > capacity) {
                Node tailNode = popTail();
                cache.remove(tailNode.key);
                size--;
            }
        } else {
            // If the key exists, update the value and move it to the head
            node.value = value;
            moveToHead(node);
        }
    }

    // Helper to add a node right after the head (most recently used)
    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    // Helper to remove a node from the linked list
    private void removeNode(Node node) {
        Node prevNode = node.prev;
        Node nextNode = node.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }

    // Move a given node to the head (most recently used)
    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    // Pop the tail node (least recently used)
    private Node popTail() {
        Node res = tail.prev;
        removeNode(res);
        return res;
    }

    public static void main(String[] args) {
        LRUCache cache = new LRUCache(3);

        // Test cases
        cache.add(1, 10);
        cache.add(2, 20);
        cache.add(3, 30);
        System.out.println(cache.get(1)); // Returns 10
        cache.add(4, 40); // Evicts key 2 (LRU key)
        System.out.println(cache.get(2)); // Returns -1 (not found)
        cache.add(5, 50); // Evicts key 3
        System.out.println(cache.get(3)); // Returns -1 (not found)
        System.out.println(cache.get(4)); // Returns 40
        System.out.println(cache.get(5)); // Returns 50
    }
}
