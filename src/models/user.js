//  const mongoose=require('mongoose');
//  const userSchema=new mongoose.Schema({
//     firstName:{
//         type:String
//     },

// lastName:{
//     type:String
// },
// email:{
//     type:String
// },

// password:{
//     type:String
// },

// age:{
//   type:Number  
// },

// gender:{
//     type:String
// }


//  });

// //  Always starts with a capital letter


//  module.exports=mongoose.model("User",userSchema);
  
const mongoose=require('mongoose')
const {Schema}=mongoose;
const userSchema=new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
})
module.exports=mongoose.model("User",userSchema); 