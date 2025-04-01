 const validator=require('validator');
 const validsignupdata=(req)=>{
   const { firstName,email,password}=req.body;
   if(!firstName){
    throw new Error("First Name cannot be empty");
   }

   else if(!validator.isEmail(email)){
    throw new Error("Email is invalid");
   }
   else if(!validator.isStrongPassword(password)){
    throw new Error("Password is weak");
   }
 };
 module.exports={
    validsignupdata
 }