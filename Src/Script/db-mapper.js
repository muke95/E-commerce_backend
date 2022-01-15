const { DB_Indics} = require("../Constants/Constants");
const path = require('path');
const database_tem  = require("../utils/database_template/database_tem")




templateArray = [];
const indics = Object.keys( DB_Indics);
const da = indics;
da.forEach((index)=>{
  let template = DB_Indics[index];
  const filePath = path.join(__dirname, `../Db-Schema/${template}.json`);
  try {
    let data = require(filePath);
    templateArray.push(database_tem.create(template , data));
    
   
  } catch (e) {
    console.log(e.message);
  }
});



