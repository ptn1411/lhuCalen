const mysql = require('../src/database/mysql');

const sql=``;
const values=[[]]
mysql.connection.query(sql, [values], function (err) {
    console.error(err);
})