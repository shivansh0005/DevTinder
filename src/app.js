
const express=require('express');

const app=express();

// Below function is known as request handler

app.use("/hello",(req,res)=>{
    res.send("Hello Hello hello")
})
app.use("/test",(req,res)=>{
    res.send("Hello form the server")
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})