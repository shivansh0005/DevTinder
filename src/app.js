
const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');


const app=express();

app.post("/signup",async (req,res)=>{
    
    const user=new User({
        firstName:"Virat",
        lastName:"Kholi",
        email:"Anushkalovesme@gmail.com",
        password:"Hero123",
        // age:"23", 
    });
try{
    await user.save();
    res.send("User Created");
}
catch(err){
    res.status(400).send("Error Saving User");
}

});
connectDB().then(()=>{
    console.log("Connected To the database");
    app.listen(3000,()=>{
        console.log("lISTENING ON PORT 3000");
    })
}).catch(err=>{
    console.log("Error in connection to the database");

})

