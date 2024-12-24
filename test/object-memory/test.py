import time

class Dummy:
    def __init__(self, id):
        self.id = id

v = []
print("Check memory before creating objects")
input()
start_time = time.time()
for i in range(10_000_000):
    v.append(Dummy(i))
print("Took %s seconds to populate the array" % (time.time() - start_time))

input()
