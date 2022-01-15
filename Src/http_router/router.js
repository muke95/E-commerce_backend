const { product_name,pro, getnextpage } = require("./product_freature/product_freature")
const {add_product,get_product,get_productbyid,delete_productbyid} = require('./muk/muk');
const moment = require('moment');
const {fetchMatchMultipleQuery} = require("./product_search/Product_search");
const {register,get_userData,login,logout} = require("./usermodel/usermodel")
const {reset_password,delete_usernamepassword} = require("./usermodel/restpassword");
const admin = require("../middleware/adminpannel");
const {create_order,get_order_data,update_order_status,delete_order} =  require("../http_router/createorder/createorder");

function logger(req, res, next) {
    console.log(req.url, req.method, moment().format("MMMM Do YYYY, h:mm:ss a"));
    next();
    
  }
  
  const middleware = [logger];
  const auther =  admin.adminpower;
module.exports= [
    {
        path: '/get_product',
        method: "get",
        middleware: middleware,
        callback: get_product,
    } ,
    {
        path: '/product',
        method: "post",
        middleware:  middleware.concat([middleware]),
        callback: add_product,
    } ,
    {
        path: '/get_product_id',
        method: "get",
        middleware: middleware,
        callback: get_productbyid,
    } ,
    {
        path: '/get_product_id',
        method: "delete",
        middleware: middleware,
        callback: delete_productbyid,
    } ,
    {
        path: '/name/:name',
        method: "put",
        middleware: middleware,
        callback:  product_name,
    },
    {
        path: '/pro',
        method: "post",
        middleware: middleware,
        callback:  pro,
    } ,
    {
        path: '/nextpage',
        method: "post",
        middleware: middleware,
        callback:  getnextpage,
    } ,

       {
        path: '/search-by-multiple',
        method: "post",
        middleware: middleware,
        callback: fetchMatchMultipleQuery ,
    } ,
    {
        path: '/register',
        method: "post",
        middleware: middleware,
        callback: register ,
    } ,
    {
        path: '/getuserData',
        method: "post",
        middleware: middleware,
        callback:  get_userData,
    },
    {
        path: '/login',
        method: "post",
        middleware: middleware,
        callback:  login,
    },
    {
        path: '/logout',
        method: "post",
        middleware: middleware,
        callback:  logout,
    },
    {
        path: '/resetpassword',
        method: "post",
        middleware: middleware,
        callback:  reset_password,
    }   ,
    {
        path: '/getuserData_delete',
        method: "post",
        middleware: middleware,
        callback:  delete_usernamepassword,
    },
    {
        path: '/create_order',
        method: "post",
        middleware: middleware,
        callback:  create_order,
    },
    {
        path: '/get_order_data',
        method: "get",
        middleware: middleware,
        callback:  get_order_data,
    },
    {
        path: '/update_order_status',
        method: "update",
        middleware: middleware,
        callback:  update_order_status,
    },


    
    {
        path: '/delete_order',
        method: "delete",
        middleware: middleware,
        callback:  delete_order,
    }

]