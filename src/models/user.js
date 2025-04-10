
const mongoose=require('mongoose')
const {Schema}=mongoose;
const bcrypt=require('bcrypt');
var validator = require('validator');

const jwt=require("jsonwebtoken");

const userSchema=new Schema({
   

    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
            trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak")
            }
        }
    },
    age:{
        type:Number,
        Min:18,
        Max:100
    },
    gender:{
        type:String,
        enum :{
values:["male","female","others"],
        message:`{VALUE} is not a valid gender`
        },
        //Validate func will run only while creating a new user
        validate(value){
            if(!["male","female","others"].includes(value)){
throw new Error("Gender not valid")
        }
        else{
            return true;
        }
    },
},
    photoUrl:{
        type:String,
        default:"https://imgs.search.brave.com/rwE-hC6ESt3hBJZhImPkb-KvU26bLDKVe-OKv1y50-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE0LzQz/LzU1LzE0NDM1NWQ3/YjM2YzVmNjQ2NDM1/NDIzNzk4MjgxY2U5/LmpwZw",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("iNVALID url")
            }
        }
    },
    Skills: {
        type: [String],
        validate: {
            validator: function (val) {
                return val.length <= 5; // Ensure the array has max 5 elements
            },
            message: "You can have a maximum of 5 skills only!"
        }
    },
    About:{
        type:String,
        default:"This is general info about User"
    }
},{timestamps:true});
userSchema.methods.getJWT=async function(){
    const user=this; //this will point to the current user instance
    const token =await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1d"}); 

return token}



userSchema.methods.verifyPassword=async function(passwordinputbyuser){
    const user=this; //this will point to the current user instance
    const passwordHash=this.password;
   const isPasswordValid=await bcrypt.compare(passwordinputbyuser,passwordHash);
  return isPasswordValid; //true or false
}

module.exports=mongoose.model("User",userSchema); 