const mongoose=require('mongoose')
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://namasteshivansh:HEU2oE9koUbKSUxM@namastenode.cxr8b.mongodb.net/devTinder");
};
module.exports=connectDB
