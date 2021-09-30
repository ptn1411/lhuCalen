const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'lhucalen'
});
const idp = 'k18';
const date = '08/17/2021';
const sql = 'SELECT * FROM khoa WHERE nienkhoa = ? ';
connection.query(sql, [idp], function (err, result) {
    if (err) throw err;
    const json = JSON.stringify(result);
    const datajson = JSON.parse(json);
    for (var i = 1; i < datajson.length; i++) {
        if (datajson[i].ngayhoc ===date){
            console.log(datajson[i]);
        }
    }
});
