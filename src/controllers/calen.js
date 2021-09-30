const dataPhong = require('../database/dataPhong');
let calen=async (req, res)=>{
    const idphong = req.params.idphong;
    if (idphong.length === 4) {
        try {
            const data = await dataPhong.datap(idphong);
            if (data.length === 0) {
                return res.render('error.ejs');
            } else {
                const json = JSON.parse(JSON.stringify(data));

                return res.render('calen.ejs',{
                    data: json
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
                for (var i = 0; i < json.length; i++) {

                }
                return res.render('calen.ejs',{
                    data: json
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
                return res.render('calen.ejs',{
                    data: json
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
module.exports ={
    calen:calen
}