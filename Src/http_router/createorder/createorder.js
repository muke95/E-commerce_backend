const database_tem  = require("../../utils/database_template/database_tem");
const { DB_Indics} = require("../../Constants/Constants");
module.exports = {

create_order: async function(req,res){
    const  {
        Payment_items_price,
        Payment_tax_price,
        shipping_price,
        total,
        orderItems_name,
        orderItems_price,
        orderItems_quantity,
        orderItems_image,
        orderItems_product,
        address,
        city,
        state,
        country,
        Pin_code,
        PhoneNo,
        Payment_id,
        order_status,
     } = await req.body;
   
    const body ={
        "Payment_items_price" : Payment_items_price,
        "Payment_tax_price"  :    Payment_tax_price,
        "shipping_price":   shipping_price,
        "total" :total,
        "orderItems_name":orderItems_name,
        "orderItems_price":orderItems_price,
        "orderItems_quantity":orderItems_quantity,
        "orderItems_image": orderItems_image,
        "orderItems_product": orderItems_product,
        "address":address,
        "city" :city,
        "state" : state,
        "country" : country,
        "Pin_code" :Pin_code,
        "PhoneNo" : PhoneNo,
        "Payment_id" : Payment_id,
        "order_status" : order_status
    }

    const status = await database_tem.addDocument(DB_Indics.order_detail,body);
  
    
    
    //.then(function(sign) {
   //   return sign;
   //}).catch(function(err){
   //   return err;
   //});
   // console.log("jwt",usertok);

             
        
     
   return res.json({
      message: status
  })  
  },
  get_order_data :  async function(req,res){
    const params = req.body;
    const body = {
        "from": 0 ,"size":1000,
        query:{
            match_all:{}
        } 
    };
    
    
    
    const  dedo  = await database_tem.search(DB_Indics.order_detail,body)
    console.log(dedo.resp._source);
 
   
    if(!dedo ){
        res.json({
            message:"error"
        })
    }
        else {
            res.json({
                
                message:dedo
            })
        
    }
},
delete_order:  async function(req,res){
    const params = req.body;
    const body = params.id
    const {token} = req.cookies;
    if(!token){
        return  res.json({
            message: "fist login"
        })
      
    }
    
    const  dedo  = await database_tem.deleteDocument(DB_Indics.order_detail,body)
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
},
update_order_status :  async function(req,res){
    const { email,order_status } = req.body;
      if(!email){
        res.json("please enter the email");
      }


      const body ={
        query: {
            match: { "email": email }
          },
        }
        const token ={
            "order_status" : order_status
         
          
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
  

  return      res.json({
              message: dab
               })  

},



}