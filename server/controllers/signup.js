require("dotenv").config();
const User = require("../models/user");
const signRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

signRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    hashPassword,
    isAdmin: false,
  });
  const saved = await user.save();

  const userForToken = {
    email,
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res
    .status(201)
    .send({ username, isAdmin: saved.isAdmin, id: user.id, email, token });
});

module.exports = signRouter;
