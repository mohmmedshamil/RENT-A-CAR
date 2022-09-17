const router = require("express").Router();
const user = require("../models/Auth");
require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: "../models/.env.local" });
const env = require("../models/.env.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailService = require("./Email/emailsender");



router.post("/register", async (req, res) => {
  var userExist = await user.findOne({ email: req.body.email });
  console.log(userExist);
  if (userExist != null) {
    res.status(500).send("email is already in use");
    return;
  }
  const activationid = Math.floor(100000 + Math.random() * 900000);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newuser = new user({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    activationid: activationid,
    activated: false,
    twofactcode: null,
  });
  // var emailsend=await emailsend(req.body.email)
  try {
    await emailService.verificationEmail(
      req.body.email,
      req.body.name,
      activationid
    );
  } catch (err) {
    res.status(500).send(err);
  }

  try {
    const saveuser = await newuser.save();
    res.status(200).send("Create An Account Successfully");
  } catch (err) {
    res.status(500).json(err).send("something goes wrong");
  }
});



router.post("/login", async (req, res) => {
  var email = req.body.email;
  var userExist = await user.findOne({ email: req.body.email });
  if (userExist != null) {
    var validPass = await bcrypt.compare(req.body.password, userExist.password);
    if (validPass) {
      const accesstoken = jwt.sign(
        {
          id: userExist._id,
        },
        env.JWT_KEY,
        { expiresIn: "3d" }
      );
      res.status(200).header("auth-token", accesstoken).send(accesstoken);
    } else {
      res.status(500).send("password is incorrect");
    }
  } else {
    res.status(500).send("email is not found");
  }
});



router.post("/activationid", async (req, res) => {
  var activationid = req.body.activationid;
  if (!activationid == null) {
    res.status(500).send("activation id not null");
  } else {
    var isactivate = await user.findOne({ activationid: activationid });
    if (isactivate != null) {
      var id = isactivate._id;
      try {
        isactivate.activated = true;
        var updateactivate = await user.findByIdAndUpdate(
          id,
          { $set: isactivate },
          { new: true }
        );
        res.status(200).send("Account Activation Success");
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(500).send("user not found");
    }
  }
});



router.post("/forgotpassword", async (req, res) => {
  var email = req.body.email;
  var isUserExit = await user.findOne({ email: email });
  if (isUserExit) {
    const forgotpassw = Math.floor(1000000 + Math.random() * 9000000);
    try {
      await emailService.forgotpass(req.body.email, isUserExit.name, forgotpassw);
      isUserExit.twofactcode = forgotpassw;
      var updateactivate = await user.findByIdAndUpdate(
        isUserExit._id,
        { $set: isUserExit },
        { new: true }
      );
      res.status(200).send("email is send");
    } catch (err) {
      res.status(500).send(err);
    }
  }
});



router.post("/forgotpasswordcheck", async (req, res) => {
  var email = req.body.email;
  var isTwofactcode = req.body.isTwofactcode;
  var isTwofact = req.body.isTwofact;
  var isUserExit = await user.findOne({ email: email });
  if (isUserExit) {
    if (isTwofact) {
      if (isUserExit.twofactcode == isTwofactcode) {
        res.status(200).send("success...! create new password");
      } else {
        res.status(500).send("twofactCode not same");
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(isTwofactcode, salt);
      isUserExit.password = hashPassword;
      var updateactivate = await user.findByIdAndUpdate(
        isUserExit._id,
        { $set: isUserExit },
        { new: true }
      );
      res.status(200).send("password changed successfully");
    }
  } else {
    res.status(500).send("user is not exist");
  }
});

module.exports = router;
