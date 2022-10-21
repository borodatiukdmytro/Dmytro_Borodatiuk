function upper_and_sort(list){return list.toUpperCase().split(";").map(item => {let new_item = item.split(":"); return `(${new_item[1]}, ${new_item[0]})`}).sort().join(" ")}
s="Fired:Corwill;Wilfred:Corwill;Barney:TornBull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill"
    console.log(upper_and_sort(s))
