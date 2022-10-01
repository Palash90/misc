from common import *;

(input, length) = getData();

comparison = 0;

for i in range(length):
    current = input[i];
    j = i - 1;

    comparison = comparison + 1;

    #UnStable Insertion sort
    
    while j>=0 and input[j] >= current:
        input[j+1] = input[j];
        j = j - 1 ;

    input[j+1]=current;

checkResult(input)
print("Comparison:\t", comparison);
