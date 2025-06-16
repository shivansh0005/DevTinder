// const mongoose = require('mongoose');

// const connectDB=async()=>{
//     await mongoose.connect('mongodb+srv://namasteshivansh:Hellomoto@namstenode1.cxr8b.mongodb.net/DevTinder');
// };
// module.exports=connectDB;

const mongoose=require('mongoose');


const connectDB=async()=>{
    await mongoose.connect(process.env.DB_CONNECTION_STRING);

}
module.exports=connectDB;