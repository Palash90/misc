import random
import matplotlib.pyplot as plt

# d is the size of bicket
# n is the total number of randoms generated
def run(n, d, max):
    if max < 2:
        print("The maximum value of random should be greater than or equal to 2")
        exit()
    result = {}
    for i in range(int(max/d) + 1):
        result[i * d] = 0
    for i in range(n):
        t = random.random() * max
        partition = int(t / d) * d
        if(partition < 0):
            print("Partition is less than 0")
        result[partition] = result[partition] + 1

    plt.bar(result.keys(), result.values())
    #plt.xlim([0, max])
    plt.show()

run(1000000, 0.1, 2)