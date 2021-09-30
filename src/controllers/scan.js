let scan=async (req, res) => {

}
let setphong = (req, res) => {
    try {
        if (req.body.room.length === 4) {
            const id = `api/phong/${req.body.room}`;
            req.flash('data', id);
            res.redirect('/');
        } else if (req.body.room.length === 9) {
            const id = `api/phong/${req.body.room}`;
            req.flash('data', id);
            res.redirect('/');
        }else if (req.body.room.length === 7){
            const id = `api/phong/${req.body.room}`;
            req.flash('data', id);
            res.redirect('/');
        }else {
            return res.render('error.ejs');
        }
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    scan: scan,
    setphong: setphong
}