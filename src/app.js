 const express=require('express');
 const app=express();


app.use("/user",(req,res,next)=>{

res.send("print karde")
next();
},(req,res)=>{

  res.send("print karde 2")
   })

 app.listen(3000,()=>{
    console.log("Server is created and listening on 3000")
 });
 
// Behind the scene

// When you run this code (e.g., with node server.js), the server starts and listens on port 3000.
// When a client sends a request to the server (e.g., via a browser or curl command), the middleware function responds with "Hello from server!".
// If you open a browser and go to http://localhost:3000, you'll see the message "Hello from server!".

 