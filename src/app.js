
const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');


const app=express();
// AS no route is given to the below mentioned Middleware it will work for all
app.use(express.json());
app.post("/signup",async (req,res)=>{
    
    //Creating a new instance of a User
    const user=new User(req.body);
try{
    await user.save();
    res.send("User Created");
}
catch(err){
    res.status(400).send("Error Saving User");
}

});

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
app.patch("/user",async(req,res)=>{
    const id=req.body.userId;
const data=req.body;
try{
    const user=await User.findByIdAndUpdate(id,data);

    console.log(user);
    res.send("User Updated");
        }
        catch(err){
    res.status(400).send("Error Updating user");
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


