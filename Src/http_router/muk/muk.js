const router = require('../../http-router');
const database_tem  = require("../../utils/database_template/database_tem");
const { DB_Indics} = require("../../Constants/Constants");
const ErrorHandler = require('../../utils/errorhandle/errorhandler');
const next = require('../../middleware/error');





module.exports =  {
    add_product :  async function(req,res){
    const params = req.body;
    const {token} = req.cookies;
    if(!token){
        return  res.json({
            message: "fist login"
        })
      
    }
    const body ={
    
    }
    
    const status = await database_tem.addDocument(DB_Indics.product,params)
    console.log('status',status);
    if(status == "eorr" ){
        res.json({
            message:"error"
        })
    }
        else {
            res.json({
                message:status
            
            })
        
    }
},

get_product :  async function(req,res){
    const params = req.body;
    const body = {
        "from": 0 ,"size":1000,
        query:{
            match_all:{}
        } 
    };
    
    
    
    const  dedo  = await database_tem.search(DB_Indics.product,body)
    console.log(dedo.resp._source);
 
   
    if(!dedo ){
        res.json({
            message:"error"
        })
    }
        else {
            res.json({
                
                message:dedo.resp._source
            })
        
    }
},
get_productbyid :  async function(req,res){
    const params = req.body;
    const body = params.id
    
    
    const  dedo  = await database_tem.get(DB_Indics.product,body)
    const lelo =  dedo.statusCode;

    console.log("dedo",lelo);
   
    if(!lelo){
        
       return next(new ErrorHandler("product id not ",404));
    }
     res.json({
                message:dedo
            })
        
    
},
delete_productbyid :  async function(req,res){
    const params = req.body;
    const body = params.id
    const {token} = req.cookies;
    if(!token){
        return  res.json({
            message: "fist login"
        })
      
    }
    
    const  dedo  = await database_tem.deleteDocument(DB_Indics.product,body)
    const lelo =  dedo;

    console.log("dedo",lelo);
   
    if(!dedo ){
        res.json({
            message:"error"
        })
    }
        else {
            res.json({
                message:lelo
            })
        
    }
}

};
