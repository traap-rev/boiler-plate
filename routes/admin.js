const routes = require('express').Router();




routes.get('/', (req,res,next)=>{
    res.status(200).json({ success: true, message: 'welcome to back office api' });

})


module.exports = routes; 