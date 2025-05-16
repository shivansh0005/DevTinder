

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

const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Ensure PATCH is included
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));




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


// const express = require('express');
// const connectDB = require('./config/database');
// const cookieParser = require("cookie-parser");
// const cors = require('cors');

// // Routes
// const authRouter = require('./Routes/auth');
// const profileRouter = require('./Routes/profile');
// const requestRouter = require('./Routes/request');
// const userRouter = require('./Routes/user');

// // Create express app
// const app = express();

// // ✅ Allowed origins
// const allowedOrigins = [
//     "http://localhost:5173", // local development frontend
//     "https://your-frontend-domain.com" // deployed frontend (replace with actual domain)
// ];

// // ✅ CORS configuration
// app.use(cors({
//     origin: function (origin, callback) {
//         // allow requests with no origin like mobile apps or curl
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
// }));

// // ✅ Preflight (OPTIONS) request handling
// app.options("*", cors());

// // Middlewares
// app.use(cookieParser());
// app.use(express.json());

// // Routes
// app.use("/", authRouter);
// app.use("/", profileRouter);
// app.use("/", requestRouter);
// app.use("/", userRouter);

// // Connect to DB and start server
// connectDB()
//     .then(() => {
//         console.log("✅ Connected to the database");
//         app.listen(3000, () => {
//             console.log("🚀 Server listening on port 3000");
//         });
//     })
//     .catch(err => {
//         console.error("❌ Database connection failed:", err);
//     });
