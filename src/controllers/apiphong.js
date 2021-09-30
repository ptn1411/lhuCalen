const dataPhong = require('../database/dataPhong');
const home = require('../database/home');
let Apiphong = async (req, res) => {
    const idphong = req.params.idphong;
    if (idphong.length === 4) {
        try {
            const data = await dataPhong.datap(idphong);
            if (data.length === 0) {
                return res.render('error.ejs');
            } else {
                const json = JSON.parse(JSON.stringify(data));
                return res.status(200).json({
                    result: json,
                });
            }
        } catch (e) {
            return res.status(500).json({
                e: e.toString(),
            })
        }
    } else if (idphong.length === 9)    {
        try {
            const data = await dataPhong.datams(idphong);
            if (data.length === 0) {
                return res.render('error.ejs');
            } else {
                const json = JSON.parse(JSON.stringify(data));
                return res.status(200).json({
                    result: json,
                });
            }
        } catch (e) {
            return res.status(500).json({
                e: e.toString(),
            })
        }
    }else if (idphong.length === 7){
        try {
            const data = await dataPhong.datalop(idphong);
            if (data.length === 0) {
                return res.render('error.ejs');
            } else {
                const json = JSON.parse(JSON.stringify(data));
                return res.status(200).json({
                    result: json,
                });
            }
        } catch (e) {
            return res.status(500).json({
                e: e.toString(),
            })
        }
    }else if (idphong.length === 3){
        try {
            const data = await home.datajson(idphong);
            if (data.length === 0) {
                return res.render('error.ejs');
            } else {
                const json = JSON.parse(JSON.stringify(data));
                return res.status(200).json({
                    result: json,
                });
            }
        } catch (e) {
            return res.status(500).json({
                e: e.toString(),
            })
        }
    }else {
        return res.render('error.ejs');
    }
}
module.exports = {
    Apiphong: Apiphong
}