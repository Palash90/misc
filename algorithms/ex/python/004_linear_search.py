from common import *;

(input, length) = getData();

def linear_search(search_term):
    for i in range(length):
        if input[i] == search_term:
            return i;
    return -1;

print(linear_search(26));

def delete(search_term):
    index = linear_search(search_term);
    if index <0:
        pass;
    else:
        for i in range(index, length-1):
            input[i] = input[i+1];
        input.pop(len(input)-1);
delete(26);
print(input)
