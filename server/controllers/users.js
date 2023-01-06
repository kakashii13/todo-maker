const userRouter = require("express").Router();
const User = require("../models/user");
const { auth, handleErrors } = require("../utils/middleware");

userRouter.get("/", auth, async (req, res, next) => {
  const token = req.token;

  const user = await User.findById(token.id);
  if (!user.isAdmin) {
    res.status(401).send("You are not authorized to access this resource");
  } else {
    const users = await User.find({});
    res.status(200).json(users);
  }
});

userRouter.get("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  const token = req.token;
  const user = await User.findById(token.id);

  if (!user) {
    return res.status(404).send("this user doesn't exist");
  } else if (token.isAdmin || token.id === id) {
    res.status(200).send(user);
  } else {
    res.status(401).send({ error: "invalid or expired token, unauthorized" });
  }
});

userRouter.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const token = req.token;
  if (token.isAdmin || token.id === id) {
    await User.findByIdAndRemove(id);
    res.status(204).json("Removed");
  } else {
    res.status(401).json({ error: "invalid or expired token" });
  }
});
module.exports = userRouter;
