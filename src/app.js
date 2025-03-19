
const express=require('express');

const app=express();

// Below function is known as request handler

// app.use("/hello/2",(req,res)=>{
//     res.send("Abra ka dabra")
// })

// app.use("/hello",(req,res)=>{
//     res.send("Hello Hello hello")
// })
app.get("/user/:userid/:name/:rollno",(req,res)=>{
    console.log(req.params)
    res.send({name:"Rahul",age:25})
})

app.post("/user",(req,res)=>{
    res.send("Save data to the server")
})
app.delete("/user",(req,res)=>{
    res.send("Delete the user")
})
app.use("/test",(req,res)=>{
    res.send("Hello form the server")
}) 

// app.use("/",(req,res)=>{
//     res.send("Generalpath ")
// })

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})