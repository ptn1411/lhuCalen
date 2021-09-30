const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'lhucalen'
});

let postddata= async (lop,tongsv,ngdd,svdihoc)=>{
    var sql = "INSERT INTO baodanh (tenlop,tongsv,ngaybao,svdihoc) VALUES ?";
    var values = [ [lop,tongsv,ngdd,svdihoc]];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
    });
}
let getddata= async (lop)=>{
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM baodanh WHERE tenlop = ?';
        connection.query(sql, [lop], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}
module.exports = {
    postddata: postddata,
    getddata: getddata
}