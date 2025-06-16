const express = require("express");
const authRouter = express.Router();
const validsignupdata = require("../utils/validation").validsignupdata;
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
  
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

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

 
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
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("Invalid creds!!!!");
    }

    const isPasswordValid = await user.verifyPassword(password);
   if (!isPasswordValid) {
      return res.status(400).send("Invalid Credentials");
    } else {
  
      const token = await user.getJWT();
   
      
      res.cookie("token", token);
     
      res.status(200).json({
        message: user.firstName + " is Logged in Successfull",
        data: user,
        token: token,
      });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.json({ error: "Error in login", details: err.message });
  }
});

authRouter.post("/Logout", async (req, res) => {


  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull");
});

module.exports = authRouter;
