const express=require("express");
const UserRouter=express.Router();
const userAuth=require("../Middleware/auth");
const connectionRequest=require("../models/connectionRequest");

//Get all pending connection req for logged in User
UserRouter.get("/user/request/recieved",userAuth,async(req,res)=>{        
try{

    const loggedInUser=req.user;
    const connectionRequests=await  connectionRequest.find({
toUserId:loggedInUser._id,
status:"intrested"


    }).populate("fromUserId",["firstName","lastName","photoUrl"]);
    if(connectionRequests.length===0){
        return res.status(404).json({message:"No Connection Requests",data:[]});
    }

    res.json({
        message:"Connection Requests",
        data:connectionRequests
    })
}
catch(err){
    res.status(400).send("Error :"+err.message);
}


})

UserRouter.get("/user/connections",userAuth,async(req,res)=>{    

try{
    const loggedInUser=req.user;
    const connectionRequests=await  connectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id,status:"accepted"},
            {toUserId:loggedInUser._id,status:"accepted"}
        ]
    }).populate("fromUserId",["firstName","lastName","photoUrl"]).populate("toUserId",["firstName","lastName","photoUrl"]);

    if(connectionRequests.length===0){
        return res.status(404).json({message:"No Connections",data:[]});
    }
    const data=connectionRequests.map((row)=>
        {
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
})
    res.json({
        message:"Connections",
        data:data
    })  



}

catch(err){
    res.status(400).send("Error :"+err.message);
}


})

module.exports=UserRouter;

