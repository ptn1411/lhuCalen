const mysql = require('mysql');
const lhucalen = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'lhucalen'
});
const datalhu = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ptn141122',
    database: 'datalhu'
});
main();

function main() {
    lhucalen.query("SELECT tenlop FROM dslop", function (err, result) {
        if (err) throw err;
        const json = JSON.parse(JSON.stringify(result));
        for (var i = 0; i < json.length; i++) {
           getdata(json[i].tenlop);
        }
    });
}

function getdata(lop) {
    var sql = 'SELECT studentID,studentName FROM thongtin WHERE className = ?';
    datalhu.query(sql, [lop], function (err, result) {
        if (err) throw err;
        const json = JSON.parse(JSON.stringify(result));
        for (var i = 0; i < json.length; i++) {
            postdata(lop,json[i].studentID,json[i].studentName)
        }
    });
}
function postdata(tenlop,mssv,tensv) {
    var sql = "INSERT INTO ds_sv (tenlop, mssv,tensv) VALUES ?";
    var values = [
        [tenlop,mssv,tensv]
    ];
    lhucalen.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result);
    });
}

