const giaovien1 = "Phan Văn Đạo";
const giaovien2 = "Đoàn Trần Hoàng Dung";

function tengv(giaovien) {
    let ho = [];
    const gvtat = giaovien.split(' ');
    const max = gvtat.length - 1;
    let i = -1;
    do {
        i = i + 1;
        ho.push(gvtat[i].slice(0, 1))
    } while (i < max - 1)
    ho.push('.'+gvtat[max])
    return ho
}


const fullten = tengv(giaovien2).join('');

console.log(fullten)
