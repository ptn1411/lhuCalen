const home = require('../src/database/home');


let getHomePage = async (req, res) => {
    const date = '08/18/2021';

    const khoa19 = 'K19';
    const data19 = await home.khoa19(khoa19);
    const json19 = JSON.parse(JSON.stringify(data19));


    let array = [];

    let index = 0;

    for (let i = 0; i < json19.length; i++) {

        if (i !== 0) {
            if (
                json19[i].ngayhoc === json19[index].ngayhoc
                && json19[i].idphong === json19[index].idphong
                && json19[i].buoi === json19[index].buoi
                && json19[i].monhoc === json19[index].monhoc
                && json19[i].giaovien === json19[index].giaovien
                && json19[i].thoigian !== json19[index].thoigian
                && json19[i].hinhthuchoc !== json19[index].hinhthuchoc
            ) {
                let newJson = {
                    id: json19[index].id,
                    nienkhoa: json19[index].nienkhoa,
                    tensv: json19[index].tensv,
                    mssv: json19[index].mssv,
                    khoa: json19[index].khoa,
                    lop: json19[index].lop,
                    thu: json19[index].thu,
                    buoi: json19[index].buoi,
                    ngayhoc: json19[index].ngayhoc,
                    idphong: json19[index].idphong,
                    phonghoc: json19[index].phonghoc,
                    tiet: [
                        {thoigian: json19[index].thoigian, hinhthuchoc: json19[index].hinhthuchoc},
                        {thoigian: json19[i].thoigian, hinhthuchoc: json19[i].hinhthuchoc}
                    ],
                    lopghep: json19[index].lopghep,
                    monhoc: json19[index].monhoc,
                    giaovien: json19[index].giaovien,
                    gvtat: null,
                    trangthai: json19[index].trangthai,
                    date: json19[index].date
                }
                array.push(newJson);
            } else{
                array.push(json19[i]);

            }

            index++;


        }
    }


    for (i = 0; i < array.length; i++) {
        if (array[i].ngayhoc === date) {
            console.log(array[i])
        }
    }

    // return res.render('homepage.ejs', {
    //     data19: json19
    // });
}

getHomePage();