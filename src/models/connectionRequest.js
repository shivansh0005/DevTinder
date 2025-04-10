const mongoose=require('mongoose');
const {Schema}=mongoose;

const connectionRequestSchema=new Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored","accepted","rejected","intrested"],
            message:`{VALUE} is not a valid status`
        },
        required:true,
    },

},{timestamps:true})

//Creating compound index to make query faster
connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save",async function(next){
   const connectionRequest=this;
   //Check if fromUserId and toUserId are the same
    if (connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()) {
         throw new Error("You cannot sendddddddddd a connection request to yourself");
      }
      next();
})

const ConnectionRequest= new mongoose.model("ConnectionRequest",connectionRequestSchema) 
module.exports=ConnectionRequest;