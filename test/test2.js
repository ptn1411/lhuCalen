const phong= "SânGD TC1 - Trung tâm GDTC";
const thoigian="07h30:09h00 (2T - Lý thuyết)09h05:11h30 (3T - Thực hành)";
const lop="100049540 - [19CT112][19CT113]100049540 - [19CT112][19CT113]";
const mon="Lập trình C#Lập trình C#";
const giaovien='Nguyễn Minh PhúcNguyễn Minh Phúc';
const text="SânGDTC1 - Trung tâm GDTC";
console.log(text.length)

const phongs =phong.slice(0,phong.length/2)
console.log(phongs.split(' ')[0]);
if(phong.length<=26){
console.log('done');
}else {

    console.log(thoigian.slice(0,thoigian.length/2));
    console.log((lop.slice(0,lop.length/2)).slice(12));
    console.log(mon.slice(0,mon.length/2));
    console.log(giaovien.slice(0,giaovien.length/2));
}