const moments = require('moment');
const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
const mysql = require('./src/database/mysql');
main();
let studentID = 120000959;

async function main() {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    });
    const page = await browser.newPage();
    await page.goto("https://calen.lhu.edu.vn/");

    await page.type('input[id="txtStudentID"]', studentID.toString());

    await page.click('#cmdTimSV');
    await page.waitForTimeout(5000);
    await page.screenshot({path: 'screenshot11.png'});
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(html);

    let childt = 14;
    let child = 15;
    let result = '';
    do {
        childt = childt + 1;
        child = child + 1;
        try {

            const seletuan = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${childt}) > td`;

            const buoisang = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td.Buoi`;
            const buoichieu = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td.Buoi`;

            const selethuhai = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)`;
            const chieuhai = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)`;

            const selethuba = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(3)`;
            const chieuba = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(3)`;

            const selethutu = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(3)`;
            const chieutu = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(4)`;

            const selethunam = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(5)`;
            const chieunam = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(5)`;

            const selethusau = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(6)`;
            const chieusau = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(6)`;

            const selethubay = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(7)`;
            const chieubay = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(7)`;

            // const selethucn = "#rowBody > div > div > div.Content > table > tbody > tr:nth-child(16) > td > table > tbody > tr:nth-child(2) > td:nth-child(8)";
            // const chieucn=`#rowBody > div > div > div.Content > table > tbody > tr:nth-child(16) > td > table > tbody > tr:nth-child(3) > td:nth-child(8)`;

            const studentName = await page.$eval('.Title', element => element.innerText);
            const tuan = await page.$eval(seletuan, (el) => el.innerText);
            // const buois = page.$eval(buoisang, (el) => el.innerText);
            // const buoic = page.$eval(buoichieu, (el) => el.innerText);

            $(selethuhai).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const buois = "Sáng";

                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buois,idphong, phong, thoigian, lop, mon, giaovien, ngay]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });
            });
            $(chieuhai).each((index, el) => {

                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const buoic = "Chiều";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buoic,idphong, phong, thoigian, lop, mon, giaovien, ngay]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });
            });

            $(selethuba).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay3 = moments(ngayf).add(1, 'days').calendar();
                const buois = "Sáng";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buois,idphong, phong, thoigian, lop, mon, giaovien, ngay3]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });
            });
            $(chieuba).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay3 = moments(ngayf).add(1, 'days').calendar();
                const buoic = "Chiều";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buoic,idphong, phong, thoigian, lop, mon, giaovien, ngay3]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });
            });

            $(selethutu).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay4 = moments(ngayf).add(2, 'days').calendar();
                const buois = "Sáng";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buois,idphong, phong, thoigian, lop, mon, giaovien, ngay4]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });
            });
            $(chieutu).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const buoic = "Chiều";
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay4 = moments(ngayf).add(2, 'days').calendar();
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buoic,idphong, phong, thoigian, lop, mon, giaovien, ngay4]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });
            });

            $(selethunam).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay5 = moments(ngayf).add(3, 'days').calendar();
                const buois = "Sáng";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buois,idphong, phong, thoigian, lop, mon, giaovien, ngay5]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });

            });
            $(chieunam).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay5 = moments(ngayf).add(3, 'days').calendar();
                const buoic = "Chiều";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buoic,idphong, phong, thoigian, lop, mon, giaovien, ngay5]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });

            });

            $(selethusau).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay6 = moments(ngayf).add(4, 'days').calendar();
                const buois = "Sáng";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buois,idphong, phong, thoigian, lop, mon, giaovien, ngay6]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });

            });
            $(chieusau).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay6 = moments(ngayf).add(4, 'days').calendar();
                const buoic = "Chiều";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buoic,idphong, phong, thoigian, lop, mon, giaovien, ngay6]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });

            });
            $(selethubay).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay7 = moments(ngayf).add(5, 'days').calendar();
                const buois = "Sáng";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buois,idphong, phong, thoigian, lop, mon, giaovien, ngay7]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });
            });
            $(chieubay).each((index, el) => {
                const phong = $(el).find('p.PhongHoc').text();
                const thoigian = $(el).find('p.ThoiGian').text();
                const lop = $(el).find('p.Nhom').text();
                const mon = $(el).find('p.MonHoc').text();
                const giaovien = $(el).find('p.GiaoVien').text();
                const ngay = tuan.slice(0, 10);
                const ngayd = ngay.slice(0, 2);
                const ngayh = ngay.slice(3, 5);
                const ngayy = ngay.slice(6, 10);
                const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
                const ngay7 = moments(ngayf).add(5, 'days').calendar();
                const buoic = "Chiều";
                const idphong=phong.slice(0,4);

                const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

                const values = [[studentID, studentName, buoic,idphong, phong, thoigian, lop, mon, giaovien, ngay7]];

                mysql.connection.query(sql, [values], function (err) {
                    if (err) throw err;
                });
            });


        } catch (e) {
            console.error(e);
        }
        result = result + child;
    } while (child < 43)
    console.log(result);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('done');
    await browser.close();
}

