require("dotenv").config();
const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function to login a user in DB
loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  // search if doesn't existe this user
  const user = await User.findOne({ email });

  // compare if the password is correct
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.hashPassword);

  // isn't correct, reponse with an error
  if (!user || !passwordCorrect) {
    return res.status(401).send({
      error: "User or password incorrect",
    });
  }

  // create a object with the main data from user to token
  const userForToken = {
    email,
    username: user.username,
    id: user.id,
    isAdmin: user.isAdmin,
  };

  // create a token
  const token = jwt.sign(userForToken, process.env.SECRET);

  // send information to client
  res.status(200).send({
    username: user.username,
    isAdmin: user.isAdmin,
    id: user.id,
    email,
    token,
  });
});

module.exports = loginRouter;
