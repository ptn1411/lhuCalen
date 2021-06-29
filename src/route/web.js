const express = require('express');
const homeController=require('../controllers/homeController');
const apiphong=require('../controllers/apiphong');
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/api/phong/:idphong',apiphong.Apiphong);
    return app.use("/", router);
}

module.exports = initWebRoutes;