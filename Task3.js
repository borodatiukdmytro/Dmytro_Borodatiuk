function digital_root(n){
    if(n/10 < 1) return n; 
    return digital_root(Array.from(n.toString()).reduce((previousVal,currentVal) => parseInt(previousVal) + parseInt(currentVal)))
}
console.log(digital_root(16))
console.log(digital_root(942))
console.log(digital_root(132189))
console.log(digital_root(493193))
