require("dotenv").config();
const User = require("../models/user");
const signRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function to create a new user in DB
signRouter.post("/", async (req, res) => {
  // get data from client side
  const { username, email, password } = req.body;

  // convert password in a hashpassword
  const hashPassword = await bcrypt.hash(password, 10);

  // validation of fields
  if (!username || !email || !password) {
    return res.status(400).send("Complete all fields");
  }

  // create and saved a new user in DB
  const user = new User({
    username,
    email,
    hashPassword,
    isAdmin: false,
  });
  const saved = await user.save();

  // create a object with data from user to token
  const userForToken = {
    email,
    username: user.username,
    id: user.id,
  };

  // create a token and send to cliend side
  const token = jwt.sign(userForToken, process.env.SECRET);
  res
    .status(201)
    .send({ username, isAdmin: saved.isAdmin, id: user.id, email, token });
});

module.exports = signRouter;
