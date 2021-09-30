const datadd = require('../database/diemdanh');

let diemdanh = async (req, res) => {
    return res.render('diemdanh.ejs');
}
let getdds = async (req, res) => {
    try {
        const lop = req.params.lophoc;
        const datalop = await datadd.getddata(lop);
        const json = JSON.parse(JSON.stringify(datalop));
        return res.status(200).json({
            result: json,
        });
    }catch (e) {
        return res.status(500).json({
            e: e.toString(),
        })
    }

}
let postdds = async (req, res) => {

    const lop = req.body.lop;
    const tongsv = req.body.tongsv;
    const ngaydiemdanh = req.body.ngaydiemdanh;
    const svdihoc = req.body.svdihoc;
    const data = await datadd.postddata(lop, tongsv, ngaydiemdanh, svdihoc);
}

module.exports = {
    diemdanh: diemdanh,
    getdds: getdds,
    postdds: postdds
}