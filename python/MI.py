def merge_intervals(intervals):
    # Sort intervals by the start time
    intervals.sort(key=lambda x: x[0])
    
    # Initialize the result list
    merged = []
    
    for interval in intervals:
        # If merged is empty or there is no overlap, add the interval
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            # There is an overlap, merge the intervals
            merged[-1][1] = max(merged[-1][1], interval[1])
    
    return merged

intervals = [[1,3],[2,6],[8,10],[15,18]]
intervals = [[1,5], [2,7], [2,10], [12, 15]]
print(merge_intervals(intervals))