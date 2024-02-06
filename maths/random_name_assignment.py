import random

def assign_names(ids, names):
    for id in ids:
        names = [[x,y,z] for x,y,z in names if not z]
        random_name = int(random.random() * len(names))
        
        id[1] = names[random_name]
        id[2] = True
        
        names[random_name][2] = True
    

def run(n):
    orig_names = ('Prashanta','Chhabi','Palash', 'Totan', 'Prapti', 'Tripti', 'Sagar', 'Rupali', 'Niranjan', 'Chirag')

    for i in range(n):
        
        ids = [[i, '', False] for i, _ in enumerate(orig_names)]
        names = [[i, val, False] for i, val in enumerate(orig_names)]

        assign_names(ids, names)
        
        correct = 0
        for n in ids:
            if n[0] == n[1][0]:
                correct += 1
            else:
                pass
        print("Correct", correct)

run(10000)

        