package com.codility;

import java.util.*;
import java.util.stream.*;

class VisitCounter {

    Map<Long, Long> count(Map<String, UserStats>... visits) {
        Map<Long, Long> result = new HashMap<Long, Long>();

        if(visits == null || visits.length==0){
            return new HashMap<Long, Long>();
        }

        // iterate over and get keys and values
        for (Map.Entry<Integer, String> k : map.entrySet()) {
            UserStats v = visits.get(k);
            try{
                Long userId = Long.parseLong(k);
                Long count = v.getVisitCount();
                if(result.containsKey(userId)){
                    result.put(userId, result.get(userId)+count);
                } else {
                    result.put(userId, count);
                }

            }catch (Exception e){

            }
        }



        return result;
    }
}

