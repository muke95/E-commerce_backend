const router = require('../../http-router');
const database_tem  = require("../../utils/database_template/database_tem");
const { DB_Indics} = require("../../Constants/Constants");
const ErrorHandler = require('../../utils/errorhandle/errorhandler');
const next = require('../../middleware/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var cookieParser = require('cookie-parser')
const options = {
    expires : new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
};

module.exports = {
     
    

    register: async function(req,res){
      const  {Name, email,password ,role} = await req.body;
       const pass = await  bcrypt.hash(password, 12).then(function(hash) {
       return hash;
    }).catch(function(err){
       return err;
    });
      
    // Store hash in your password DB.
        const dedo = pass;
       console.log("dedo",dedo);
    
      const body ={
        Name: Name,
        email:email,
        password: dedo,
        role: "user"
      }

      const status = await database_tem.addDocument(DB_Indics.signup,body);
      const com = status.resp;
      const user_id = status.resp._id; 
      const usertok = await jwt.sign({ id: user_id }, process.env.jwttoken);
      
      
      
      //.then(function(sign) {
     //   return sign;
     //}).catch(function(err){
     //   return err;
     //});
     // console.log("jwt",usertok);

     const token = usertok;
      if(!status){
          res.json({
              message: "error"
               
          })
       }
       res.json({
        message: com,
        token : token
    })  
    },

     login: async function(req,res,next ){
        const  {email,password } = req.body;
       if(!email||!password){
          res.json("please enter the email and password");
        }
             
     
        
      // Store hash in your password DB.
         
      
        const body ={
            query: {
                match: { "email": email }
              },
            }
        
  
        const  status  = await database_tem.search(DB_Indics.signup,body);
        const com = status;
        if(com == 0){
            res.json("email not match");
        }
        var results = [];
        results = status.resp.hits.hits.map(function(hit){ return hit._source.password });

        pass =  results.toString();
        const clear = await bcrypt.compare(password, pass).then(function(result) {
                return result; 
            ///function(err, result) {
            // result == true
           // console.log("result",result);
        });
         
        const token = await jwt.sign({ id: password }, process.env.jwttoken);
          
        //.then(function(sign) {
       //   return sign;
       //}).catch(function(err){
       //   return err;
       //});
        console.log("",clear);
  
       
        if(clear ==  false){
            res.json({
                message: "error"
                 
            })
         }
         else{
         res.cookie('token',token,options).json({
          message: "passed",
          
      })  
      }
  
    },
    logout  :  async function(req,res){
        console.log('Cookies: ', req.cookies)
        res.cookie('token',null,{
            expires : new Date(Date.now()),
            httpOnly:true,
        });
        res.json({
            message: "logout"
        })
    },



     get_userData  :  async function(req,res){
        //console.log('Cookies: ', req.cookies)
         
        // Cookies that have been signed
      //  console.log('Signed Cookies: ', req.signedCookies)
      
        const {token} = req.cookies;
        if(!token){
            return  res.json({
                message: "fist login"
            })
          
        }
        console.log(token);
        const body = {
            "from": 0 ,"size":1000,
            query:{
                match_all:{}
            } 
        };
        
        
       
        const  dedo  = await database_tem.search(DB_Indics.signup,body)
        console.log(dedo);
     
       
        if(!dedo ){
            res.json({
                message:"error"
            })
        }
        res.json({
            message:dedo.resp
        })





    }

}