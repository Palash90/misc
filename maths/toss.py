import numpy as np
import matplotlib.pyplot as plt
def toss(n):
	result = []
	for i in range(n):
		result.append(np.random.choice(['H', 'T']))
	return result

# c is the number of coins to be tossed
# n is the total number of the coin toss experiment to run to generate the histogram plot
def run(n, c):
	result = {}
	for i in range(c):
		result[i] = 0
	for i in range(n):
		t = toss(c)
		numOfHead = t.count('H')
		result[numOfHead] = result.get(numOfHead, 0) + 1

	print(result)
	plt.bar(result.keys(), result.values())
	plt.show()

run(10000, 4)
