const express = require('express');
const homeController = require('../controllers/homeController');
const apiphong = require('../controllers/apiphong');
const calen=require('../controllers/calen');
const scan = require('../controllers/scan');
const diemdanh = require('../controllers/diemdanh');
const chart = require('../controllers/chart');
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/scan',scan.scan);
    router.get('/api/phong/:idphong', apiphong.Apiphong);
    router.get('/calen/:idphong', calen.calen);
    router.get('/diemdanh', diemdanh.diemdanh);
    router.get('/getdd/:lophoc', diemdanh.getdds);
    router.get('/chart/:lophoc', chart.Chart);
    router.post('/room', scan.setphong);
    router.post('/postdd', diemdanh.postdds);
    router.get('*', (req, res) => res.send('Page Not found 404'));
    return app.use("/", router);
}

module.exports = initWebRoutes;