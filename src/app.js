
const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');
const {validsignupdata}=require('./utils/validation');
const bcrypt=require('bcrypt');
const cookieparser=require("cookie-parser")
const jwt=require("jsonwebtoken");
const userAuth=require('./Middleware/auth');
const {validateProfileEditData}=require('./utils/validation');

const authRouter=require('./Routes/auth');
const profileRouter=require('./Routes/profile');
const Requestrouter=require('./Routes/request');





const app=express();

app.use(cookieparser());

app.use(express.json());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",Requestrouter);




connectDB().then(()=>{
    console.log("Connected To the database");
    app.listen(3000,()=>{
        console.log("lISTENING ON PORT 3000");
    })
}).catch(err=>{
    console.log("Error in connection to the database");

})


