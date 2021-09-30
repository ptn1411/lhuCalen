const thoigian="07h30:09h00 (2T - Lý thuyết)09h05:11h30 (3T - Thực hành)";


const t2=thoigian.slice(0,thoigian.length/2)
const t3=thoigian.slice(thoigian.length/2)

const thoigians= t2.slice(0,5)+':'+t3.slice(6,11)

console.log(t2)
console.log(t3)
console.log(thoigians)