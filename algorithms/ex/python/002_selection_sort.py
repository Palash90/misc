from common import *;

(input, length) = getData();
comparison = 0;
for i in range(length-1):

    minIndex = i;

    for j in range(i+1, length):
        comparison = comparison + 1;
        if input[j]<input[minIndex]:
            minIndex = j;

    tmp = input[minIndex];
    input[minIndex]=input[i];
    input[i]=tmp;

checkResult(input);
print("Comparison:\t", comparison);
