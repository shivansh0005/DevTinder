const express = require("express");
const authRouter = express.Router();
const validsignupdata = require("../utils/validation").validsignupdata;
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation os data should be done as soon as user is registered
    validsignupdata(req);

    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      skills,
      photoUrl,
      About,
    } = req.body;

    //Encrypt you password should be done on priority

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // //Creating a new instance of a User
    const user = new User({
      firstName,
      skills,
      photoUrl,
      About,
      age,
      gender,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token);
    res.json({ message: "User Created Successfully", data: savedUser });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    return res.status(404).send("Testing Dummy Response");
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("Invalid creds!!!!");
    }
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid Credentials");
    } else {
      //Create a JWT Token
      // const token =await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1d"});  ;
      const token = await user.getJWT();

      //Add the toekn to cookie and send the response back to the User
      res.cookie("token", token);
      // res.send(user.firstName+" is Logged in Successfull");
      res.json({
        message: user.firstName + " is Logged in Successfull",
        data: user,
        token: token,
      });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(400).json({ error: "Error in login", details: err.message });
  }
});

authRouter.post("/Logout", async (req, res) => {
  // const token=req.cookies.token;
  // if(!token){
  //     return res.status(400).send("No user is logged in");
  // }
  // try{
  //     res.clearCookie(token);
  //     res.send("Logout Successfull")
  // }
  // catch(err){
  //     res.status(400).send("Error in Logout")
  // }

  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull");
});

module.exports = authRouter;
