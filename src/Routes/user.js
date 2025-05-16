const express=require("express");
const UserRouter=express.Router();
const userAuth=require("../Middleware/auth");
const connectionRequest=require("../models/connectionRequest");
const User=require("../models/user");
//Get all pending connection req for logged in User
UserRouter.get("/user/request/recieved",userAuth,async(req,res)=>{        
try{

    const loggedInUser=req.user;
    const connectionRequests=await  connectionRequest.find({
toUserId:loggedInUser._id,
status:"intrested"


    }).populate("fromUserId",["firstName","lastName","photoUrl","About","age","gender"]);
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
    }).populate("fromUserId",["firstName","lastName","photoUrl","About","age","gender"]).populate("toUserId",["firstName","lastName","photoUrl","age","gender","About"]);

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
UserRouter.get("/feed",userAuth,async(req,res)=>{

    try{
        const LoggedInUser=req.user;
        const page=parseInt(req.query.page) ||1;
        let limit=parseInt(req.query.limit) ||10;
        if(limit>50){
            limit=50;
        }
         const skip=(page-1)*limit;

        //Find all connection requests(sent +recieved)
        const connectionRequests=await  connectionRequest.find({
            $or:[
                {fromUserId:LoggedInUser._id},
                {toUserId:LoggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed=new Set();

        connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })

        console.log(hideUserFromFeed);
        const user=await User.find({
          $and:[{_id:{$nin:Array.from(hideUserFromFeed)}},
            {_id:{$ne:LoggedInUser._id}}
          ],

        }).select("firstName lastName photoUrl  About age gender ").skip(skip).limit(limit);

        res.send(user);


    }
    catch(err){
        res.status(400).json({message:"Error : ",error:err.message});
    }
})

module.exports=UserRouter;

