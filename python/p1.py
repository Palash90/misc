originalString= "codeleetcode", strToSearch = "code"
 
# retrun the first index of strToSearch

n = len(strToSearch)
m = len(originalString)

# check if n or m = 0 or m < n return -1

for i in range(0,(m - n)):
    strCur = ""

    for j in (i, n):
        strCur += originalString[j] 
    
    if strToSearch == strCur:
        print(i)
        break

    print(-1)

