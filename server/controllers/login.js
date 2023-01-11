require("dotenv").config();
const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.hashPassword);

  if (!user || !passwordCorrect) {
    return res.status(401).send({
      error: "User or password incorrect",
    });
  }

  const userForToken = {
    email,
    username: user.username,
    id: user.id,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({
    username: user.username,
    isAdmin: user.isAdmin,
    id: user.id,
    email,
    token,
  });
});

module.exports = loginRouter;
