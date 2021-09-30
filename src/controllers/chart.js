const chartdata = require('../database/chart')
let Chart = async (req, res) => {
    try {
        const chart = req.params.lophoc;


        const datalop = await chartdata.chartdata(chart)
        const json = JSON.parse(JSON.stringify(datalop));
        const arraylop=[];
        for (var i = 0; i < json.length; i++) {
           arraylop.push(json[i].thuhai,json[i].thuba,json[i].thutu,json[i].thunam,json[i].thusau,json[i].thubay)
        }


        return res.send(arraylop);
    } catch (e) {
        return res.status(500).json({
            e: e.toString(),
        })
    }
}

module.exports = {
    Chart: Chart
}