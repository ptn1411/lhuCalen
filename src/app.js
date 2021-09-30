const express = require('express');
const bodyParser= require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const viewEngine=require('./config/viewEngine');
const initWebRoutes=require('./route/web');

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    cookie: {max:60000},
    resave: false,
   saveUninitialized:false
}));
app.use(flash());
viewEngine(app);
initWebRoutes(app);

let port = 8080;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : http://localhost:"+port)
})