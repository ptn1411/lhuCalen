const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'lhucalen'
});

let dataview = (lop,date) => {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM fulldata WHERE nienkhoa = ?';
        connection.query(sql, [lop], function (err, result) {
            if (err) throw err;
            const json = JSON.parse(JSON.stringify(result));
            const slag = [];
            for (var i = 0; i < json.length; i++) {
                if (json[i].ngayhoc === date) {
                    slag.push(json[i])
                }
                resolve(slag)
            }
        });
    });
}
let dataf = (idp) => {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM fulldata WHERE nienkhoa = ?';
        connection.query(sql, [idp], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}
let datajson = (idp,date) => {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM fulldata WHERE nienkhoa = ?';
        connection.query(sql, [idp], function (err, result) {
            if (err) throw err;
            const json18 = JSON.parse(JSON.stringify(result));
            const slag = [];
            for (var i = 0; i < json18.length; i++) {
                if (json18[i].ngayhoc === date) {
                    slag.push(json18[i])
                }
                resolve(slag)
            }
        });
    });
}
module.exports ={
    dataview:dataview,
    dataf:dataf,
    datajson:datajson
}