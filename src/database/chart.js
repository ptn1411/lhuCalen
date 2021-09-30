const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'lhucalen'
});

let chartdata = (lop) => {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT thuhai,thuba,thutu,thunam,thusau,thubay FROM chartdd WHERE lop = ?';
        connection.query(sql, [lop], function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
}

module.exports = {
    chartdata: chartdata
}