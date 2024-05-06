const express=require('express');
const mySqlPool = require('./config/db');
const Studentrouter = require('./routes/studentRoutes')
const app=express();

//middleware
app.use(express.json());

//routes
app.use("/api/v1/student",Studentrouter);

app.get('/',(req,res)=>{
    res.status(200).send("Node SQL")
});


//port
const port=4500;


//contidionaly listen with sql
mySqlPool.query('SELECT 1').then(()=>{
//my sql
console.log("my sql connected");
//listen
app.listen(port,()=>{
    console.log("server running");
 });
}).catch((err)=>{
    console.log(err)
})
