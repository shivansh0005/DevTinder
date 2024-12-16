 const express=require('express');
 const connectDB=require("./config/database");
 const app=express();
 const User=require("./models/user")

 const signup=app.post("/signup",async(req,res)=>{
const userObj={
   firstName:"akash",
   lastname:"mahi",
   emailId:"S@G.COM",
   password:"Sakshi"
}
// Creating a new instance of user model
const user=new User(userObj);
try{
await user.save();
res.send("User added succesfully");
}catch(err){
   res.status(400).send("Error saving user")
}
 });
 connectDB().then(()=>{
   console.log("Database connection is successfull")
   }).catch((err)=>{
   console.error("ERR!");
   });
 app.listen(3000,()=>{
    console.log("Server is created and listening on 3000")
 });
 
//DevTinder is a database->user is the collection-> inside is document