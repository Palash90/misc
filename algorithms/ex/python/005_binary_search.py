from common import *;

(input, length) = getSortedData();

def binary_search(search_term, low, high):
    if low<0 or high > length:
        return -1;

    if low == high and input[low]==search_term:
        return low;

    if low == high and input[low]!=search_term:
        return -1;

    if input[low] == search_term:
        return low;

    if input[high] == search_term:
       return high;

    mid = int((low + high) / 2);

    if search_term < input[mid]:
        return binary_search(search_term, low, mid);
    else:
        return binary_search(search_term, mid + 1, high);

print("Position of 2:",binary_search(2, 0, length-1));
print("Position of 26:",binary_search(26, 0, length-1));

def delete(search_term):
    global length;
    index = binary_search(search_term,0, length-1);
    if index <0:
        pass;
    else:
        for i in range(index, length-1):
            input[i] = input[i+1];
        input.pop(len(input)-1);
        length = length - 1;

delete(2);
delete(26);
print(input)
