// app.use(cors({
//     origin: [
//         "http://localhost:5173",
//         "https://your-frontend-domain.com" // <-- add your deployed frontend URL here
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
// }));



const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const { validsignupdata } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require('./Middleware/auth');
const { validateProfileEditData } = require('./utils/validation');

const authRouter = require('./Routes/auth');
const profileRouter = require('./Routes/profile');
const Requestrouter = require('./Routes/request');
const UserRouter = require('./Routes/user');
const cors = require('cors');
require('dotenv').config();
require('./utils/cronJob'); 
const app = express();


const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://superlative-bublanina-a16d88.netlify.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // <-- Add this line




app.use(cookieparser());
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", Requestrouter);
app.use("/", UserRouter);

connectDB().then(() => {
    console.log("Connected To the database");
    app.listen(3000, () => {
        console.log("LISTENING ON PORT 3000");
    });
}).catch(err => {
    console.log("Error in connection to the database");
});

