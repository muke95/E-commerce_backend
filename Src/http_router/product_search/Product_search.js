const esb = require('elastic-builder');
const router = require('../../http-router');
const database_tem  = require("../../utils/database_template/database_tem");
const { DB_Indics} = require("../../Constants/Constants");
const ErrorHandler = require('../../utils/errorhandle/errorhandler');


module.exports= {
      fetchMatchMultipleQuery   : async function(req,res) {
                        const origin = req.query.Origin;
                        const name = req.query.Name;
                        const price = req.query.price;
                        try {
                        const result = await database_tem.fetchMatchMultipleQuery(origin, name, price);
                        console.log("result",result)
                        const data = result.body.hits.hits.map((car)=>{
                            return {
                            id: car._id,
                            data: car._source
                            }
                        })
                        res.json({status_code: 200, success: true, data: data, messsage: "fetch match query for multiple requests successful!" });
                        } catch (err) {
                        res.json({status_code: 500, success: false, data: [], message: err});
                        }
}
}