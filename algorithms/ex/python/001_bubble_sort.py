from common import *;

(input, length) = getData();

comparison = 0;

for i in range(length):
    for j in range(i):
        comparison = comparison + 1;
        if (input[i] < input[j]):
            tmp = input[i];
            input[i]=input[j];
            input[j]=tmp;

checkResult(input);
print("Comparison:\t", comparison);
