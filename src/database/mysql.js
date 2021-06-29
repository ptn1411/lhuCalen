const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'lhucalen'
});
module.exports={
    connection:connection
}