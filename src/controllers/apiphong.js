const dataPhong = require('../database/dataPhong');
let Apiphong = async (req, res) => {
    const idphong =req.params.idphong;
    try {
        const data = await dataPhong.data(idphong);
      const json=JSON.parse(JSON.stringify(data));
        return res.status(200).json({
            result: json,
        })
    } catch (e) {
        return res.status(500).json({
            e: e.toString(),
        })
    }
}
module.exports = {
    Apiphong: Apiphong
}