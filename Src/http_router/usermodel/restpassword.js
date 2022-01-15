const crypro = require("crypto");
const database_tem  = require("../../utils/database_template/database_tem");
const { DB_Indics} = require("../../Constants/Constants");
const sendEmail = require("../../utils/sendEmail");



module.exports = {
    reset_password : async function(req,res){
        const { email } = req.body;
         /// gerating reset token
       const resertoken = crypro.randomBytes(20).toString('hex');
       const resethash = crypro
       .createHash("sha256")
       .update(resertoken)
       .digest("hex");
       console.log(resethash);

       const resettokenexpire = Date.now();
          schema ={
            "resetpasswordToken" : resethash,
             "resetpasswordExpire" : resettokenexpire 
          }
      ////
      
      
          if(!email){
            res.json("please enter the email");
          }


          const body ={
            query: {
                match: { "email": email }
              },
            }
            const token ={
             
              "resetpasswordExpire" : resettokenexpire, 
              "resetpasswordToken" : resethash
              
              }
  
        const  status  = await database_tem.search(DB_Indics.signup,body);
        const com = status.resp.hits.hits;
        if(com == 0){
          return res.json("email not match");
            
        }
        var results = [];
        results = status.resp.hits.hits.map(function(hit){ return hit._id });
        pass =  results.toString();
        const  dab  = await database_tem.updateDocument(DB_Indics.signup, pass,token);
        console.log(dab);
        // sent email to user
        const sent = await sendEmail({
         email : user.email,
         subject : `ecommerce reset password`,
         message,

        })

        const resettokenurl = `${req.protocol}://${req.get(" Host ")}/api/v1/${resethash}`
        const message = `your password reset token is :- \n\n ${resettokenurl} \n\n ,please don't share anyone`


      return      res.json({
                  message: dab
                   })  

    },
    delete_usernamepassword : async function(req,res){
      const { email } = req.body;
 
        if(!email){
          res.json("please enter the email");
        }


        const body ={
          query: {
              match: { "email": email }
            },
          }
        

      const  status  = await database_tem.search(DB_Indics.signup,body);
      const com = status.resp.hits.hits;
      if(com == 0){
        return res.json("email not match");
          
      }
      var results = [];
      results = status.resp.hits.hits.map(function(hit){ return hit._id });
      pass =  results.toString();
      const  dab  = await database_tem.deleteDocument(DB_Indics.signup, pass );
      console.log(dab);
   

   


    return      res.json({
                message: dab
                 })  

  }
}

