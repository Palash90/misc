'''
     *  Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
 
Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

[1,3], [1,5]

[1, 5],[2,5]
[1, 5],[5,10]

[[1,3],[8,10],[2,6],[15,18]]
     * 
     * If unsorted, the algo goes for O(n^2)
     * 
     * If sort, the algo goes for O(nLogn)
     * 
     * Element[i+1].startI >= element[i].startI && elemet[i+1].startI <= element[i].endI
     * element[i].startI, element[i+1].endI
     */
'''

input = [[1,3],[2,6],[8,10],[15,18]]
input = [[1,5], [2,7], [2,10], [12, 15]]

input.sort()

length = len(input)

intervals = []

'''
while 0 ... n{
    mergeSegment.startI = input[i][0]
    mergeSegment.endI = input[i][1]
    
    while j ... n -1 {
        if input[j][0] >= mergeSegment.startI and input[j][0] <= mergeSegment.endI:
            mergeSegment.endI = input[j][1]
            j++
        else:
            break;
    }

    intervals.append([mergeSegment.startI, mergeSegment.endI])
}

'''
i = 0
mergeSegment = {}
while i < length:
    mergeSegment['startI'] = input[i][0]
    mergeSegment['endI'] = input[i][1]

    j = i
    print(i)
    while j < length - 1:
        print(j)
        if input[j][0] >= mergeSegment['startI'] and input[j][0] <= mergeSegment['endI']:
            print("If")
            mergeSegment['endI'] = input[j][1]
            j += 1
        else:
            print("else")
            j=j+1
            break
        #i = i + 1
    i = i + 1
    intervals.append([mergeSegment['startI'], mergeSegment['endI']])

'''
for i in range(0, length-1):
    if input[i + 1][0] >= input[i][0] and input[i + 1][0] <= input[i][1]:
        interval = [input[i][0], input[i+1][1]]
        intervals.append(interval)
        i = i + 1
    else:
        intervals.append(input[i])
'''

print(intervals)
