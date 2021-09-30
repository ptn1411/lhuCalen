const moments = require('moment');
const puppeteer = require("puppeteer"); //scan
const cheerio = require('cheerio'); //scan
const mysql = require('./mysql'); // mysql


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
        } else if (i === mssv.length) {
            break;
        }
    }
}

// let nienkhoa = nkhoa[0];
// let studentID = mssv[0];
// let lops = lopss[0];
//
// main('K19', '120001480', '19CT113', 'CNTT');

async function main(nienkhoa, studentID, lops, khoa) {
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

                const selesang = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(2) > td:nth-child(${thu}) > div`;
                const selechieu = `#rowBody > div > div > div.Content > table > tbody > tr:nth-child(${child}) > td > table > tbody > tr:nth-child(3) > td:nth-child(${thu}) > div`;

                const studentName = await page.$eval('.Title', element => element.innerText);
                const tensv = studentName.slice(23);
                const tuan = await page.$eval(seletuan, (el) => el.innerText);

                const thum = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

                $(selesang).each(async (index, el) => {

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
                    const idphong = phong.split(' ')[0];


                    const tm = thum[xetngay];

                    // const trangthais = $(el).attr('class').split(' ');

                    const trangthai = "null";

                    const lopghep = lop.slice(12);
                    const thoigians = thoigian.slice(0, 11);

                    function tengv(giaoviens) {
                        let ho = [];
                        const gvtat = giaoviens.split(' ');
                        const max = gvtat.length - 1;
                        let i = -1;
                        do {
                            i = i + 1;
                            ho.push(gvtat[i].slice(0, 1))
                        } while (i < max - 1)
                        ho.push('.' + gvtat[max])
                        return ho
                    }


                    if (phong.length === 0) {
                        console.log('');
                    } else if (phong.length <= 26 && phong.length > 1) {

                        const fullten = tengv(giaovien).join('');
                        await mysql.adddata(nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phong, thoigians, lopghep, mon, giaovien, fullten, trangthai)
                    } else {
                        const phongs = phong.slice(0, phong.length / 2);

                        const t2 = thoigian.slice(0, thoigian.length / 2);
                        const t3 = thoigian.slice(thoigian.length / 2);
                        const thoigians = t2.slice(0, 5) + ':' + t3.slice(6, 11);

                        const lopvip = (lop.slice(0, lop.length / 2)).slice(12);
                        const mons = mon.slice(0, mon.length / 2);
                        const giaoviens = giaovien.slice(0, giaovien.length / 2);
                        const fullten = tengv(giaoviens).join('');
                        await mysql.adddata(nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phongs, thoigians, lopvip, mons, giaoviens, fullten, trangthai)
                    }

                });

                $(selechieu).each(async (index, el) => {

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

                    // const trangthai = $(el).attr('class').split(' ');
                    const trangthai = "null";
                    const lopghep = lop.slice(12);
                    const thoigians = thoigian.slice(0, 11);

                    function tengv(giaoviens) {
                        let ho = [];
                        const gvtat = giaoviens.split(' ');
                        const max = gvtat.length - 1;
                        let i = -1;
                        do {
                            i = i + 1;
                            ho.push(gvtat[i].slice(0, 1))
                        } while (i < max - 1)
                        ho.push('.' + gvtat[max])
                        return ho
                    }

                    if (phong.length === 0) {
                        console.log('');
                    } else if (phong.length <= 26 && phong.length > 1) {
                        const fullten = tengv(giaovien).join('');
                        await mysql.adddata(nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phong, thoigians, lopghep, mon, giaovien, fullten, trangthai)
                    } else {
                        const phongs = phong.slice(0, phong.length / 2);

                        const t2 = thoigian.slice(0, thoigian.length / 2);
                        const t3 = thoigian.slice(thoigian.length / 2);
                        const thoigians = t2.slice(0, 5) + ':' + t3.slice(6, 11);

                        const lopvip = (lop.slice(0, lop.length / 2)).slice(12);
                        const mons = mon.slice(0, mon.length / 2);
                        const giaoviens = giaovien.slice(0, giaovien.length / 2);
                        const fullten = tengv(giaoviens).join('');
                        await mysql.adddata(nienkhoa, tensv, studentID, khoa, lops, tm, buoi, ngay3, idphong, phongs, thoigians, lopvip, mons, giaoviens, fullten, trangthai)
                    }

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
    console.log('done: ' + studentID);
}
