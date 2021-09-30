
const moments = require('moment'); //bien su thoi gian bat dau
const puppeteer = require("puppeteer"); //scan
const cheerio = require('cheerio'); //scan
const mysql = require('./src/database/mysql'); // mysql


let scankhoa= async function (studentID,khoa,childt,childmax) {


    const browser = await puppeteer.launch({
        headless: false,
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

    let child = childt +1;
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
            const buoi1="#rowBody > div > div > div.Content > table > tbody > tr:nth-child(14) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1)";
            const buoi2="#rowBody > div > div > div.Content > table > tbody > tr:nth-child(14) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2)";
            const studentName = await page.$eval('.Title', element => element.innerText);
            const tensv=studentName.slice(23);
            const tuan = await page.$eval(seletuan, (el) => el.innerText);
            // const buois = page.$eval(buoisang, (el) => el.innerText);
            // const buoic = page.$eval(buoichieu, (el) => el.innerText);


do {
    $(selethuhai).each((index, el) => {
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
        const buois = "Sáng";

        const idphong=phong.slice(0,4);

        const sql = "INSERT INTO khoa (nienkhoa,tensv,mssv,ngayhoc,idphong,phongjoc,thoigian,lophoc,monhoc,giaovien,buoi,tiet) VALUES ?";

        const values = [[khoa, tensv, studentID,ngayf, idphong, phong, thoigian, lop, mon, giaovien,buois]];

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
        const ngayd = ngay.slice(0, 2);
        const ngayh = ngay.slice(3, 5);
        const ngayy = ngay.slice(6, 10);
        const ngayf = `${ngayh}/${ngayd}/${ngayy}`;
        const buoic = "Chiều";
        const idphong=phong.slice(0,4);

        const sql = "INSERT INTO calen (mssv,tensv,buoi,idphong,phong,thoigian,lop,mon,giaovien,ngay) VALUES ?";

        const values = [[studentID, studentName, buoic,idphong, phong, thoigian, lop, mon, giaovien, ngayf]];

        mysql.connection.query(sql, [values], function (err) {
            if (err) throw err;
        });
    });
}while(1<i)


        } catch (e) {
            console.error(e);
        }
        result = result + child;
    } while (child < childmax)
    console.log(result);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await browser.close();
    console.log('done');
}
module.exports ={
    scankhoa:scankhoa
}
