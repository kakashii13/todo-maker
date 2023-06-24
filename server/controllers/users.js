const userRouter = require("express").Router();
const User = require("../models/user");
const Todo = require("../models/todo");
const { auth } = require("../utils/middleware");

// get users from DB, only admin can see this
userRouter.get("/", auth, async (req, res, next) => {
  const token = req.token;

  // search user in DB by id
  const user = await User.findById(token.id);

  // validate type of user
  if (!user.isAdmin) {
    res.status(401).send("You are not authorized to access this resource");
  } else {
    const users = await User.find({});
    res.status(200).json(users);
  }
});

// get a unique user by id from DB
userRouter.get("/:id", auth, async (req, res, next) => {
  // get id user from client side
  const { id } = req.params;

  const token = req.token;
  // search user from DB
  const user = await User.findById(token.id);

  // validate if the user that sent the request is correct
  if (!user) {
    return res.status(404).send("this user doesn't exist");

    // if the user is an admin or the same user from the request, they can see this
  } else if (token.isAdmin || token.id === id) {
    res.status(200).send(user);
  } else {
    res.status(401).send({ error: "invalid or expired token, unauthorized" });
  }
});

// delete user from DB
userRouter.delete("/:id", auth, async (req, res) => {
  // get id user todo delete from client side
  const { id } = req.params;

  const token = req.token;

  // get user for delete todos
  const user = await User.findById(id);

  // if the user is an admin or the same user from the request, they can delete this
  if (token.isAdmin || token.id === id) {
    // first delete the user's todos and then delete the user
    await Todo.deleteMany({ _id: { $in: user.todos } });
    await User.findByIdAndRemove(id);
    res.status(204).json("Removed");
  } else {
    res.status(401).json({ error: "invalid or expired token" });
  }
});
module.exports = userRouter;
