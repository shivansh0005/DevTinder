 const jwt = require('jsonwebtoken');
 const User = require('../models/user');
 
 const userAuth=async (req,res,next)=>{
  try{
    // Read the token from req cookies
  //Validate the Token
  //Find the username
  const cookies = req.cookies;
  const { token } = cookies;
  if (!token) {
    return res.status(401).send("Token not found");
  }
  const decodedObj=await jwt.verify(token,"DEV@Tinder$790" );
  const {_id}=decodedObj;
  const user= await User.findById(_id);
  if(!user){
    return res.status(404).send("User Not Found");
  } 
  req.user=user;
  next();
  }
  catch(err){
    res.status(401).send("ERROR: "+ err.message);
  }
}

module.exports = userAuth;