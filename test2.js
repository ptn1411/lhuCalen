var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ptn141122",
    database: "datalhu"
});
const data = [
    '18KT111',
    '18LU111',
    '18NH111',
    '18NT111',
    '18OT111',
    '18OT112',
    '18OT113',
    '18QT111',
    '18QT112',
    '18TD111',
    '18TP111',
    '18VN111',
    '18XC111',
    '18XD111',
    '19AV111',
    '19AV112',
    '19AV113',
    '19AV114',
    '19CD111',
    '19CT111',
    '19CT112',
    '19CT113',
    '19CT114',
    '19DC111',
    '19DH111',
    '19DH112',
    '19DH113',
    '19DH114',
    '19DN111',
    '19DN112',
    '19DN113',
    '19DN114',
    '19DN115',
    '19DS111',
    '19DS112',
    '19DT111',
    '19DT112',
    '19DT113',
    '19DT114',
    '19DT115',
    '19KT111',
    '19LU111',
    '19NH111',
    '19NT111',
    '19OT111',
    '19OT112',
    '19OT113',
    '19QD111',
    '19QT111',
    '19QT112',
    '19QT113',
    '19TD111',
    '19TP111',
    '19XC111',
    '19XD111',
    '20AV111',
    '20AV112',
    '20AV113',
    '20AV114',
    '20CD111',
    '20CT111',
    '20CT112',
    '20CT113',
    '20CT114',
    '20DC111',
    '20DH111',
    '20DH112',
    '20DH113',
    '20DN111',
    '20DN112',
    '20DN113',
    '20DN114',
    '20DS111',
    '20DS112',
    '20DT111',
    '20DT112',
    '20DT113',
    '20DT114',
    '20DT115',
    '20KT111',
    '20LU111',
    '20NH111',
    '20NT111',
    '20OT111',
    '20OT112',
    '20OT113',
    '20QD111',
    '20QT111',
    '20QT112',
    '20QT113',
    '20TD111',
    '20TP111',
    '20XC111',
    '20XD111'];

console.log(data.length);
for (let i = 0; i <= 93; i++) {
    const lop = data[i];

    const sql = 'SELECT * FROM thongtin WHERE className = ?';
    con.query(sql, [lop], function (err, result) {
        if (err) throw err;
        const id = JSON.stringify(result);
        const sd = JSON.parse(id);

        const sqls = "INSERT INTO calen (lop,mssv) VALUES ?";

        const values = [[lop, sd[0].studentID]];

        con.query(sqls, [values], function (err) {
            if (err) throw err;
            console.log('done');
        });
    });

}




