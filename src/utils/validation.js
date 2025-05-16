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
 const validateProfileEditData = (req) => {
  console.log("Validating Profile Edit Data", req.body);
  const allowedEditFields = [
    "about", "Skills", "photoUrl", "gender",
    "age", "lastName", "firstName", "email"
  ];

  const isallowed=Object.keys(req.body).every(field=>allowedEditFields.includes(field));

return isallowed;
 }

module.exports={
    validsignupdata,
    validateProfileEditData
};