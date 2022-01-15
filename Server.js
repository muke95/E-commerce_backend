const app = require('./app');
const dotenv = require('dotenv');
require("./Src/http-router")
require("./Src/Script/db-mapper");
const path = require("path");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
//handing uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down due to uncaught exception `);
    process.exit(1);
})

//dotenv config
dotenv.config({path :"config/config.env"});



const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
});
// Setting EJS as templating engine
app.use(expressLayout);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//unhandle  promise rejection
process.on("unhandledRejection",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down due to unhandle  promise rejection `);
   server.close(()=>{
       process.exit(1);
   });
    
})