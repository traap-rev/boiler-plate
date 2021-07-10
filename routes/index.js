import express from "express";
var routes = express.Router();
import bodyParser from "body-parser";
import adminroutes from "./admin";
 
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.use((req, res, next) => {
    // do logging
    console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
    next(); // make sure we go to the next routes and don't stop here
});

//routes.use('/backoffice', admin) //admin section require su permissions

routes.get('/', (req, res, next) => {
    res.status(200).json({ success: true, message: 'welcome to api' });

})
routes.use('/admin',adminroutes)

export default routes; 