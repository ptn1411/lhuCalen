const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'lhucalen'
});
let data = (idp) => {
return new Promise(function(resolve, reject){
    const sql = 'SELECT * FROM calen WHERE idphong = ?';
    connection.query(sql, [idp], function (err, result) {
        if (err) throw err;
        resolve(result);
    });
});

}
module.exports = {
    data: data
}