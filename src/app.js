 const express=require('express');
 const app=express();
 const {adminAuth,userAuth}=require('./utils/auth')

//GET /users=>middleware chain  =>request handler(only middle ware which send resposne)
//General middleware for all request

app.use("/admin",adminAuth);
app.use("/user",userAuth)

app.get("/admin/getAllData",(req,res)=>{
 res.send("all data sent")
})

app.get("/admin/deleteUser",(req,res)=>{
   res.send("Deleted a User")
  })

  app.get("/user",(req,res)=>{
   //Generating Random Error
   throw new Error("haanji bhai");
   res.send("User Login");
  })
//Error handeling
app.use("/",(err,req,res,next)=>{
 if(err){
   res.status(500).send("Something went wrong")
 }
})
 app.listen(3000,()=>{
    console.log("Server is created and listening on 3000")
 });
 
// Behind the scene

// When you run this code (e.g., with node server.js), the server starts and listens on port 3000.
// When a client sends a request to the server (e.g., via a browser or curl command), the middleware function responds with "Hello from server!".
// If you open a browser and go to http://localhost:3000, you'll see the message "Hello from server!".

 