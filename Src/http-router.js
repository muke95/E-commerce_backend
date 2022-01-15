const app  = require("../app");
const express = require('express');
const middlewareError = require('./middleware/error');
var cookieParser = require('cookie-parser')
const bodyParsar = require('body-parser').json();

router = require("./http_router/router");
app.use(express.json());
app.use(cookieParser());
//middleware for error
app.use(middlewareError);








//routes
app.get('/',(req,res)=>{
    res.render('adminHome');
    
});
router.forEach((route)=>{
    const { path,method,middleware,callback } = route;
    if(app[method]){
        app[method](path,middleware,callback);
    }

});
    





module.exports = {app};