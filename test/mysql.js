const mysql = require('../src/database/mysql'); // mysql

let adddata = (nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phong, thoigians, lopghep, mon, giaovien,fullten, trangthai)=>{
        const sql = "INSERT INTO fulldata (nienkhoa,tensv,mssv,khoa,lop,thu,buoi,ngayhoc,idphong,phonghoc,thoigian,lopghep,monhoc,giaovien,gvtat,trangthai) VALUES ?";

        const values = [[nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phong, thoigians, lopghep, mon, giaovien,fullten, trangthai]];

        mysql.connection.query(sql, [values], function (err) {
            if (err) throw err;
        });
}
module.exports ={
        adddata: adddata
}