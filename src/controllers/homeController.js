const home = require('../database/home');

let getHomePage = async (req, res) => {
const date='08/18/2021';
    const khoa18 = 'K18';
    const data18 = await home.dataview(khoa18,date);

    const khoa19 = 'K19';
    const data19 = await home.dataview(khoa19,date);

    const khoa20 = 'K20';
    const data20 = await home.dataview(khoa20,date);

    const khoa21 = 'K21';
    const data21 = await home.dataview(khoa20,date);

    return res.render('homepage.ejs', {
        data18: data18,
        data19: data19,
        data20: data20,
        khoa18: khoa18,
        khoa19: khoa19,
        khoa20: khoa20,
        khoa21:khoa21,
        data21: data21,
    });
}

module.exports = {
    getHomePage: getHomePage

}