
const express=require('express');

const app=express();



app.get("/admin",(req,res,next)=>{

   throw new Error("ABCDEF");
   
    res.send("Route handler 2");
   
})
app.use("/",(err,req,res,next)=>{
 if(err){
    //  console.log(err);
     res.status(500).send("Something went wrong");
 }
})
app.listen(3000,()=>{
    console.log("lISTENING ON PORT 3000");
})