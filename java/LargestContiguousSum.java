public class LargestContiguousSum {

    public static int largestContiguousSum(int[] arr) {
        if (arr.length == 0) {
            return 0;
        }

        int maxCurrent = arr[0];
        int maxGlobal = arr[0];

        for (int i = 1; i < arr.length; i++) {
            maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
            maxGlobal = Math.max(maxCurrent, maxGlobal);
        }

        return maxGlobal;
    }

    public static void main(String[] args) {
        int[] arr = {-3, 12, 2, -1, 4, -3};
        System.out.println(largestContiguousSum(arr));
    }
}

