const ErrorHandler = require("../utils/errorhandle/errorhandler");


module.exports = function(err,req,res,next){
    err.statuscode =  err.statuscode || 500 ;
    err.message =  err.message || "internal Server error";
      console.log("err.message",err.message);
    res.status(err.statuscode).json(
        {
            success: false,
            error: err.message,
        });
    
};