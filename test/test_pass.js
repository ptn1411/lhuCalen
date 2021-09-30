const fetch = require('node-fetch');
let password = async () => {
    return new Promise(async function (resolve, reject) {
        const url = "https://raw.githubusercontent.com/richiemann/vietnam-password-lists/master/top100-vn-passwords.txt";
        const data = await fetch(url).then(res => res.text());
        const text = data.split('\n');
        resolve(text)
    })
}
module.exports = {
    password: password
}


