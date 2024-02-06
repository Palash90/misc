import random
import matplotlib.pyplot as plt
def toss(n):
    result = []
    for i in range(n):
        result.append(random.choice([0, 1, 2]))
    #print(result)
    return result

# d is the number of dice rolled
# n is the total number of the coin toss experiment to run to generate the histogram plot
def run(n, d):
	result = {}
	for i in range(d):
		result[i] = 0
	for i in range(n):
		t = toss(d)
		numOfOne = t.count(1)
		result[numOfOne] = result.get(numOfOne, 0) + 1

	print(result)
	plt.bar(result.keys(), result.values())
	plt.show()

run(100000, 10)