const express=require('express')
const app=express()
app.use("/test",(req,res)=>{
    res.send("Hello homework")
})

app.listen(7777);
