const express = require('express');
const Requestrouter = express.Router();
 const userAuth = require('../Middleware/auth');
 const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const { Connection } = require('mongoose');

Requestrouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
  try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

   

   

    const allowedStatuses=["ignored","intrested"];
    if(!allowedStatuses.includes(status)){
      return res.status(400).json({ message: "Invalid status Type : " +status });
    }

    const touser=await User.findById(toUserId);
    const fromuser=await User.findById(fromUserId);
    if (fromUserId.toString() === toUserId.toString()) {
        return res.status(400).json({ message: "You cannot send a connection request to yourself" });
      }
      
    if(!touser){
      return res.status(404).json({ message: "User not found" });
    }  

    //Check if the connection request already exists
    const existingRequest=await ConnectionRequest.findOne({

    $or:[
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId }
    ]
    });
    if(existingRequest){
      return res.status(400).json({ message: "Connection request already exists" });
    }
    const connectionRequest=new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });
    const data=await connectionRequest.save();
    res.json({
      message: `Connection request marked as '${status}' and sent successfully.`,
      data
    });
    
    


  }
  catch(err){
    res.status(400).send("Error :"+err.message);
  }
    
    })

    module.exports=Requestrouter;