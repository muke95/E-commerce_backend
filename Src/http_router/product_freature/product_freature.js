const router = require('../../http-router');
const database_tem  = require("../../utils/database_template/database_tem");
const { DB_Indics} = require("../../Constants/Constants");
const ErrorHandler = require('../../utils/errorhandle/errorhandler');
const next = require('../../middleware/error');




module.exports =  {
    product_name :  async function(req,res){
        const params = req.params;
       const data = params.name
       
        console.log(data)




       const body = {
            query: {
              match: { "name": data }
            },
          }
        
        
        
        
        
        const  dedo  = await database_tem.search(DB_Indics.product,body)
        console.log(dedo);
     
       
        if(!dedo ){
            res.json({
                message:"error"
            })
        }
            else {
                res.json({
                    
                    message: dedo.status 
                })
            
        }
    },
    pro :  async function(req,res){
        
      
        const { collection, id_marca_estilo, next_page } = await req.query;
        console.log(" next_page", next_page);
        const payload = {
         //HERE I`M JUST PUTTING TO ONLY RETURNS TO ME
         // 10 ITEMS
         from: 0, size: 1,
        }
       
        try {
                             //indexName    //Query
       const status = await database_tem.search_data('product', payload);  
        //RETURNS TO ME AN ARRAY OF DATA FROM 0 TO 10
        const produtos = []; // just creating an more useful array of datas
        console.log("status",status)
        
        await status.resp.hits.hits.map(product => {
         produtos.push({
          id: product._id,
          data: product._source,
        });
       });
        const pro = {};
        // because i used the parameter scroll on my searchData function,
        // I have the scroll_id value
        pro.next_page = status.resp._scroll_id; 
        // I create a value on my object that has the value from the next 
        // page
        
        pro.data = produtos;
        console.log("sta",pro);
        return res.status(200).send(pro); // return the value 
       } catch (err) {
         console.log('Error getting products from a single collection',     err);
         return res.status(500).send(err);
         }
       },



       getnextpage :  async function(req,res){
        
      
        const {  nextPage } = await req.query;
        
        console.log("status",nextPage)
       
        try {
                             //indexName    //Query
       const status = await database_tem.scrollData(nextPage);  
        //RETURNS TO ME AN ARRAY OF DATA FROM 0 TO 10
        const produtos = []; // just creating an more useful array of datas
        console.log("status",status)
        
        await status.resp.hits.hits.map(product => {
         produtos.push({
          id: product._id,
          data: product._source,
        });
       });
        const pro = {};
        // because i used the parameter scroll on my searchData function,
        // I have the scroll_id value
        pro.next_page = status.resp._scroll_id; 
        // I create a value on my object that has the value from the next 
        // page
        
        pro.data = produtos;
        console.log("sta",pro);
        return res.status(200).send(pro); // return the value 
       } catch (err) {
         console.log('Error getting products from a single collection',     err);
         return res.status(500).send(err);
         }
       }


}