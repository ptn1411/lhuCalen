const {tb} = require('../controllers/getroom');
let getHomePage = (req, res) => {
    const data =tb;
    console.log(tb);
    return res.render('homepage.ejs', {
        data: data
    });

}
// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage
}