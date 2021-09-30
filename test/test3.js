const home =require('../src/database/home');
// function main(){
//     home.datajson('K19','08/21/2021').then(function(result){
//         for (var i=0; i<result.length; i++){
//             console.log(result[i]);
//         }
//     })
// }
// main();

function dates(){
    const text ='08/17/2021';
    const ngay=text.slice(0,2);
    const thang =text.slice(3,5);
    const nam =text.slice(6);
    console.log(ngay,thang,nam)
    console.log( new Date(nam,thang,ngay))
    console.log(new Date(2017, 1, 4))

}
dates();