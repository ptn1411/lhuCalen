const puppeteer = require("puppeteer");

const password = require('./test_pass');

main();

async function main() {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    });
    const page = await browser.newPage();
    await page.goto("https://app.lhu.edu.vn/");
    while (password.password().length > 0) {
        password.password()
        await page.type('input[id="inputUserName"]', UserName.toString());
        await page.type('input[id="inputPassword"]', Password.toString());

        await page.click('#cmdOK');
        await page.waitForTimeout(3000);

        await page.click('#divApps > div:nth-child(6) > ul > li:nth-child(2) > a');

        await page.waitForTimeout(1000);

        const mssv = await page.$eval('#accordion > div:nth-child(1) > div > div > div > div.dataCell', element => element.innerText);
        const image = `https://file.lhu.edu.vn/me/avatarorigin/${mssv}.jpg`;
        const divUserName = await page.$eval('#divUserName', element => element.innerText);
        const divUserPhone = await page.$eval('#divUserPhone', element => element.innerText);
        const divEmail = await page.$eval('#divEmail', element => element.innerText);

        console.log(image, mssv, divUserName, divUserPhone, divEmail);

        await page.screenshot({path: 'screenshot11.png'});
    }
    await browser.close();
}