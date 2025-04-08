const express = require('express');

const profileRouter = express.Router();
const userAuth = require('../Middleware/auth');

const { validateProfileEditData } = require('../utils/validation');
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try {
    
  
      const user=req.user;
  
  
  
      res.send(user);
  
     }catch(err){
      res.status(400).send("Error in fetching profile data");
     }
  
  })

  profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
  try{
if(!validateProfileEditData(req)){
throw new Error("Invalid  Edit Request");
}
const LoggedInuser=req.user;
console.log(LoggedInuser);

Object.keys(req.body).forEach((key=>LoggedInuser[key]=req.body[key]));
console.log(LoggedInuser);
await LoggedInuser.save();
res.json({
  message: `${LoggedInuser.firstName}, Your profile has been Updated Successfully`,
  data: LoggedInuser
});
}catch(err){
    return res.status(400).send("ERROR :" +err.message);
  }

  })
  module.exports=profileRouter;
