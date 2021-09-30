const home = require('./src/database/home');

async function datak18(khoa18) {
    return new Promise(async function (resolve, reject) {
        const date = '08/17/2021';
        const data18 = await home.khoa18(khoa18);
        const json18 = JSON.parse(JSON.stringify(data18));
        const slag = [];
        for (var i = 0; i < json18.length; i++) {
            if (json18[i].ngayhoc === date) {
                slag.push(json18[i])
            }
            resolve(slag)
        }
    })
}

datak18("K18").then(function (result) {
    console.log(result);
})



