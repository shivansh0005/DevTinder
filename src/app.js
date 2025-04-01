
const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');
const {validsignupdata}=require('./utils/validation');
const bcrypt=require('bcrypt');


const app=express();
// AS no route is given to the below mentioned Middleware it will work for all
app.use(express.json());
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
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).send("Invalid Credentials");
    }
    else{
        res.send("Login Successfull");
    }


}
catch{
   res.status(400).send("Error in login");
}


})

//Find one user by email

app.get("/users",async (req,res)=>{
    try{
        const a=await User.findOne({email:req.body.email});
        if(a){
            res.send(a);
        }
        else{
            res.send("User Not Found");
        }
    }
    catch(err){
        res.status(400).send("Error in fetching user");
    }   
})
//GET user by email

app.get("/user",async (req,res)=>{
    const useremail=req.body.email;

    try{
      const user=  await User.find({email:useremail});
      console.log(user)
      if(user.length===0){
          return res.status(404).send("User Not Found");
      }
      res.send(user);

    }
    catch(err){
        res.status(400).send("Error in fetching user");
    }

})

//Feed API-GET /feed-get all the users from the database 
app.get("/feed",async(req,res)=>{
    try{
       
  const users=await User.find({});
  res.send(users);
      }
      catch(err){
          res.status(400).send("Error in fetching user");
      }
})

// Delete user 
app.delete("/del",async(req,res)=>{
    const b=req.body.userId;

 try{
const user=await User.findByIdAndDelete(b);
console.log(user);
res.send("User Deleted");
    }
    catch(err){
res.status(400).send("Error in deleting user");
    }

})

//Update data of user api
app.patch("/user/:userId",async(req,res)=>{
    const id=req.params?.userId;
    const data=req.body;
  
try{
    const ALLOWED_UPDATES=["photoUrl","Skills","age"]
    const isUpdatedAllowed=Object.keys(data).every((k)=>
       ALLOWED_UPDATES.includes(k)
    ); 
    if(!isUpdatedAllowed){
       throw new Error("Invalid Updates");
    }

   
    const user=await User.findByIdAndUpdate(id,data, { new: true, runValidators: true } );
    

    console.log(user);
    res.send("User Updated");
        }
        catch(err){
    res.status(400).send(err.message);
        }

})

connectDB().then(()=>{
    console.log("Connected To the database");
    app.listen(3000,()=>{
        console.log("lISTENING ON PORT 3000");
    })
}).catch(err=>{
    console.log("Error in connection to the database");

})


