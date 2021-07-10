const express = require("express");
var routes = express.Router();
const bodyParser = require("body-parser");
const adminroutes = require("./admin");
 
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.use((req, res, next) => {
    console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
    next(); 
});


routes.get('/', (req, res, next) => {
    res.status(200).json({ success: true, message: 'welcome to api' });

})
routes.use('/admin',adminroutes)

module.exports = routes;