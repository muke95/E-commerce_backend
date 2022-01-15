const database_tem  = require("../utils/database_template/database_tem");
const { DB_Indics} = require("../../Src/Constants/Constants");


async function adminpower(req, res, next) {
    const num = req.query;
    const email = num.email;
    if(!email){
     return res.json({
        message: "first right email"
      })
    }
    const body ={
        query: {
            match: { 
                     "email": email }
          },
        }
    

    const  status  = await database_tem.search(DB_Indics.signup,body);
    
    
  
    var admin = [];
   
   admin = status.resp.hits.hits.map(function(hit){ return hit._source.role });
    use =  admin.toString();
    res.json({
      mess: status 
    })
    console.log("use",use)
    if(use == "user"){
      res.json("you are not admin");
  }
    next();
    
  }
  


  module.exports = {adminpower};