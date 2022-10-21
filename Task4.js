
    function count_num_of_pairs(list, target){
        let count = 0;
        Array.from(list).forEach( item => {
            for(let element of list){
                if(list.indexOf(element) === list.indexOf(item)){
                    continue
                }
                if(item + element === target){
                    count++ 
                }
            }
        })
        return count/2;
    }
    console.log(count_num_of_pairs([1,3,6,2,2,0,4], 5))
