const express = require("express");

const profileRouter = express.Router();
const userAuth = require("../Middleware/auth");
const bcrypt = require("bcrypt");

const { validateProfileEditData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error in fetching profile data");
  }
});

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
  console.log("Inside Edit Profile Route");
  try {
    console.log(validateProfileEditData(req), "Validating Data");
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid  Edit Request");
    }
    const LoggedInuser = req.user;
    console.log(LoggedInuser);

    Object.keys(req.body).forEach((key) => (LoggedInuser[key] = req.body[key]));
    console.log(LoggedInuser);
    await LoggedInuser.save();
    res.json({
      message: `${LoggedInuser.firstName}, Your profile has been Updated Successfully`,
      data: LoggedInuser,
    });
  } catch (err) {
    return res.status(400).send("ERROR :" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const LoggedInuser = req.user;
    const password = req.body.password;

    const passwordHash = await bcrypt.hash(password, 10);
    const comparePassword = await bcrypt.compare(
      password,
      LoggedInuser.password
    );
    if (comparePassword) {
      return res.status(400).send("Password cannot be same as old password");
    }
    LoggedInuser.password = passwordHash;
    await LoggedInuser.save();
    res.send("Password Updated Successfully");
  } catch (err) {
    return res.status(400).send("ERROR :" + err.message);
  }
});
module.exports = profileRouter;
