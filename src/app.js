
const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');
const {validsignupdata}=require('./utils/validation');
const bcrypt=require('bcrypt');
const cookieparser=require("cookie-parser")
const jwt=require("jsonwebtoken");
const userAuth=require('./Middleware/auth');



const app=express();
//Inorder to read cookies npm i cookie-parser then use it
app.use(cookieparser());
// AS no route is given to the below mentioned Middleware it will work for all
app.use(express.json());

//signup
app.post("/signup",async (req,res)=>{
 
try{
     //Validation os data should be done as soon as user is registered
    validsignupdata(req);

    const {firstName,lastName,email,password}=req.body;

  //Encrypt you password should be done on priority

const passwordHash=await bcrypt.hash(password,10);
console.log(passwordHash);


  // //Creating a new instance of a User
    const user=new User({
        firstName,lastName,email,password:passwordHash,
    });


    await user.save();
    res.send("User Created");
}
catch(err){
    res.status(400).send(err.message);
}

});

// Login api
app.post("/login",async(req,res)=>{

try{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(404).send("Invalid creds!!!!");
    }
    const isPasswordValid=await user.verifyPassword(password);
    if(!isPasswordValid){
        return res.status(400).send("Invalid Credentials");
    }
    else{


        //Create a JWT Token
        // const token =await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1d"});  ;
const token =await user.getJWT();


        //Add the toekn to cookie and send the response back to the User
        res.cookie("token",token)
        res.send("Login Successfull");
    }


}
catch{
   res.status(400).send("Error in login");
}


})

//Profile api
app.get("/profile",userAuth,async (req,res)=>{
  try {
    

    const user=req.user;



    res.send(user);

   }catch(err){
    res.status(400).send("Error in fetching profile data");
   }

})

app.post("/sendconnectionreq",userAuth,async(req,res)=>{
console.log("Sending connection request");
const user=req.user;
console.log(req.user);
res.send(user.firstName+" sent you a connection request");
})

 


connectDB().then(()=>{
    console.log("Connected To the database");
    app.listen(3000,()=>{
        console.log("lISTENING ON PORT 3000");
    })
}).catch(err=>{
    console.log("Error in connection to the database");

})


