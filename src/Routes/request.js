const express = require('express');
const Requestrouter = express.Router();
 const userAuth = require('../Middleware/auth');

Requestrouter.post("/sendconnectionreq",userAuth,async(req,res)=>{
    console.log("Sending connection request");
    const user=req.user;
    console.log(req.user);
    res.send(user.firstName+" sent you a connection request");
    })

    module.exports=Requestrouter;