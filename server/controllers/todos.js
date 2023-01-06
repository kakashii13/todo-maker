const todosRouter = require("express").Router();
const Todo = require("../models/todo");
const { auth } = require("../utils/middleware");

const User = require("../models/user");

todosRouter.get("/", auth, async (req, res) => {
  const token = req.token;
  const todos = await Todo.find({}).populate("user", {
    username: 1,
    id: 1,
  });
  const user = await User.findById(token.id);
  if (!user) {
    res.status(401).json("this user doesn't exist");
  } else if (user.isAdmin) {
    res.status(200).send(todos);
  } else {
    const todosByUser = todos.filter((todo) => todo.user?.id === token.id);
    res.status(200).send(todosByUser);
  }
});

// todosRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const todo = await Todo.findById(id);
//   res.json(todo);
// });

todosRouter.post("/", auth, async (req, res) => {
  const { todo } = req.body;
  const token = req.token;
  const user = await User.findById(token.id);

  const newTodo = new Todo({
    todo,
    complete: false,
    user: user._id,
  });

  const saved = await newTodo.save();
  user.todos = user.todos.concat(saved._id);
  await user.save();
  res.status(201).send(saved);
});

todosRouter.delete("/:id", auth, async (req, res) => {
  const token = req.token;
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (token.id === todo.user.toJSON()) {
    await Todo.findByIdAndRemove(id);
    res.status(204).send("removed");
  } else if (token.isAdmin) {
    await Todo.findByIdAndRemove(id);
    res.status(204).send("removed");
  } else {
    res.status(401).send("token invalid or expired");
  }
});

todosRouter.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { todo, complete } = req.body;
  const token = req.token;
  const todoDB = await Todo.findById(id);

  const newTodo = {
    todo,
    complete,
  };

  if (token.id === todoDB.user.toJSON()) {
    await Todo.findByIdAndUpdate(id, newTodo);
    res.status(200);
  } else if (token.isAdmin) {
    await Todo.findByIdAndUpdate(id, newTodo);
    res.status(200);
  } else {
    res.status(401).send("token invalid or expired");
  }
});

module.exports = todosRouter;
