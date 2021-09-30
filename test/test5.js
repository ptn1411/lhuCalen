const moments = require('moment'); //bien su thoi gian bat dau
const puppeteer = require("puppeteer"); //scan
const cheerio = require('cheerio'); //scan
const mysql = require('./src/database/mysql'); // mysql


run();

async function run() {
    let nkhoa = ['K18', 'K19', 'K20'];
    let mssv = ['118000996', '118001219', '118001525', '119000708', '119001033', '119001358', '119001278', '120000163', '120000526', '120000959', '120001480'];
    let lopss = ['18CT111', '18CT112', '18CT113', '19CT111', '19CT112', '19CT113', '19CT114', '20CT111', '20CT112', '20CT113', '20CT114'];
    let khoa = "CNTT";
    for (var i = 0; i < mssv.length; i++) {

        if (mssv[i].slice(1, 3) == 18) {
            await main(nkhoa[0], mssv[i], lopss[i], khoa);
        } else if (mssv[i].slice(1, 3) == 19) {
            await main(nkhoa[1], mssv[i], lopss[i], khoa);
        } else if (mssv[i].slice(1, 3) == 20) {
            await main(nkhoa[2], mssv[i], lopss[i], khoa);
        }
    }
}

// let nienkhoa = nkhoa[0];
// let studentID = mssv[0];
// let lops = lopss[0];


async function main(nienkhoa, studentID, lops, khoa) {
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

    let childt = 0;
    let child = 1;
    let result = '';
    do {
        childt = childt + 1;
        child = child + 1;
        try {
            let thu = 1;
            let xetngay = -1;
            do {

                thu = thu + 1

                xetngay = xetngay + 1

                const seletuan = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${childt}) > td`;

                const selethuhai = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(${thu}) > div > div:nth-child(1)`;
                const selethuhai2 = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(${thu}) > div > div:nth-child(2)`;

                const chieuhai = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(${thu}) > div > div:nth-child(1)`;
                const chieuhai2 = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(${thu}) > div > div:nth-child(2)`;

                const studentName = await page.$eval('.Title', element => element.innerText);
                const tensv = studentName.slice(23);
                const tuan = await page.$eval(seletuan, (el) => el.innerText);

                const thum = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

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
                    const ngay3 = moments(ngayf).add(xetngay, 'days').calendar();
                    const buoi = "Sáng";
                    const idphong = phong.slice(0, 4);
                    const tm = thum[xetngay];

                    const trangthai = $(el).attr('class').split(' ');
                    const lopghep = lop.slice(12);
                    const thoigians = thoigian.slice(0, 11);
                    const hinhthuchoc = thoigian.slice(18, -1);

                    function tengv(giaoviens) {
                        let ho = [];
                        const gvtat = giaoviens.split(' ');
                        const max = gvtat.length - 1;
                        let i = -1;
                        do {
                            i = i + 1;
                            ho.push(gvtat[i].slice(0, 1))
                        } while (i < max - 1)
                        ho.push('.'+gvtat[max])
                        return ho
                    }

                    const fullten = tengv(giaovien).join('');


                    const sql = "INSERT INTO khoa (nienkhoa,tensv,mssv,khoa,lop,thu,buoi,ngayhoc,idphong,phonghoc,thoigian,hinhthuchoc,lopghep,monhoc,giaovien,gvtat,trangthai) VALUES ?";

                    const values = [[nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phong, thoigians, hinhthuchoc, lopghep, mon, giaovien,fullten, trangthai[1]]];

                    mysql.connection.query(sql, [values], function (err) {
                        if (err) throw err;
                    });
                });
                $(selethuhai2).each((index, el) => {
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
                    const ngay3 = moments(ngayf).add(xetngay, 'days').calendar();
                    const buoi = "Sáng";

                    const idphong = phong.slice(0, 4);
                    const tm = thum[xetngay];
                    const trangthai = $(el).attr('class').split(' ');
                    const lopghep = lop.slice(12);
                    const thoigians = thoigian.slice(0, 11);
                    const hinhthuchoc = thoigian.slice(18, -1);

                    function tengv(giaoviens) {
                        let ho = [];
                        const gvtat = giaoviens.split(' ');
                        const max = gvtat.length - 1;
                        let i = -1;
                        do {
                            i = i + 1;
                            ho.push(gvtat[i].slice(0, 1))
                        } while (i < max - 1)
                        ho.push('.'+gvtat[max])
                        return ho
                    }

                    const fullten = tengv(giaovien).join('');


                    const sql = "INSERT INTO khoa (nienkhoa,tensv,mssv,khoa,lop,thu,buoi,ngayhoc,idphong,phonghoc,thoigian,hinhthuchoc,lopghep,monhoc,giaovien,gvtat,trangthai) VALUES ?";

                    const values = [[nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phong, thoigians, hinhthuchoc, lopghep, mon, giaovien,fullten, trangthai[1]]];
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
                    const ngay3 = moments(ngayf).add(xetngay, 'days').calendar();
                    const buoi = "Chiều";
                    const idphong = phong.slice(0, 4);
                    const tm = thum[xetngay];

                    const trangthai = $(el).attr('class').split(' ');
                    const lopghep = lop.slice(12);
                    const thoigians = thoigian.slice(0, 11);
                    const hinhthuchoc = thoigian.slice(18, -1);

                    function tengv(giaoviens) {
                        let ho = [];
                        const gvtat = giaoviens.split(' ');
                        const max = gvtat.length - 1;
                        let i = -1;
                        do {
                            i = i + 1;
                            ho.push(gvtat[i].slice(0, 1))
                        } while (i < max - 1)
                        ho.push('.'+gvtat[max])
                        return ho
                    }

                    const fullten = tengv(giaovien).join('');


                    const sql = "INSERT INTO khoa (nienkhoa,tensv,mssv,khoa,lop,thu,buoi,ngayhoc,idphong,phonghoc,thoigian,hinhthuchoc,lopghep,monhoc,giaovien,gvtat,trangthai) VALUES ?";

                    const values = [[nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phong, thoigians, hinhthuchoc, lopghep, mon, giaovien,fullten, trangthai[1]]];
                    mysql.connection.query(sql, [values], function (err) {
                        if (err) throw err;
                    });
                });


                $(chieuhai2).each((index, el) => {

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
                    const ngay3 = moments(ngayf).add(xetngay, 'days').calendar();
                    const buoi = "Chiều";
                    const idphong = phong.slice(0, 4);
                    const tm = thum[xetngay];

                    const trangthai = $(el).attr('class').split(' ');
                    const lopghep = lop.slice(12);
                    const thoigians = thoigian.slice(0, 11);
                    const hinhthuchoc = thoigian.slice(18, -1);

                    function tengv(giaoviens) {
                        let ho = [];
                        const gvtat = giaoviens.split(' ');
                        const max = gvtat.length - 1;
                        let i = -1;
                        do {
                            i = i + 1;
                            ho.push(gvtat[i].slice(0, 1))
                        } while (i < max - 1)
                        ho.push('.'+gvtat[max])
                        return ho
                    }

                    const fullten = tengv(giaovien).join('');


                    const sql = "INSERT INTO khoa (nienkhoa,tensv,mssv,khoa,lop,thu,buoi,ngayhoc,idphong,phonghoc,thoigian,hinhthuchoc,lopghep,monhoc,giaovien,gvtat,trangthai) VALUES ?";

                    const values = [[nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phong, thoigians, hinhthuchoc, lopghep, mon, giaovien,fullten, trangthai[1]]];
                    mysql.connection.query(sql, [values], function (err) {
                        if (err) throw err;
                    });
                });
            } while (thu < 7)

        } catch (e) {
            console.error(e);
        }
        result = result + child;
    } while (child < 42)
    console.log(result);
    await new Promise(resolve => setTimeout(resolve, 2000));

    await browser.close();
    console.log('done');
}

//#rowBody > div > div > div.Content > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)
//#rowBody > div > div > div.Content > table > tbody > tr:nth-child(42) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)