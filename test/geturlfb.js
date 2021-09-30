const axios = require('axios');
const cheerio = require('cheerio');

async function main() {

    const html = await axios.get('https://m.facebook.com/sctv9.com.vn/videos/588378528335740');
    const $ = await cheerio.load(html.data);
console.log(html.data)
    $('#u_0_12_qx > div > div._5rgu._7dc9._27x0 > section > div > div').each((index, element) => {
        const image = $(element).find('video').attr('src');
        console.log(element)

    })
}
main()