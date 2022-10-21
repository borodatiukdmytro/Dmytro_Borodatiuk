function first_non_repeating_letter(exp){
        for(let n of exp){
          let count = 0;
          let index = exp.indexOf(n)
          while(index != -1){
              count++ 
              index = exp.indexOf(n, index + 1)
          }
          if(count === 1){
              return n
          }
        }
      }
       console.log(first_non_repeating_letter("stress"))
       console.log(first_non_repeating_letter("sTreSS"))
