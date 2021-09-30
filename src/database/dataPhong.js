const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'lhucalen'
});
let datap = (idp) => {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM calen WHERE idphong = ?';
        connection.query(sql, [idp], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}
let datalop = (idp) => {
    return new Promise(function (resolve, reject) {

        const sql = `SELECT * FROM calen WHERE lop LIKE '%${idp}%'`;
        connection.query(sql, [idp], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}
let datams = (idp) => {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM calen WHERE mssv = ?';
        connection.query(sql, [idp], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}
module.exports = {
    datap: datap,
    datalop: datalop,
    datams: datams
}