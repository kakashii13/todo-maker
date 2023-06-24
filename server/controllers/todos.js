const todosRouter = require("express").Router();
const Todo = require("../models/todo");
const { auth } = require("../utils/middleware");
const User = require("../models/user");

// get TODOS from DB
todosRouter.get("/", auth, async (req, res) => {
  const token = req.token;
  const todos = await Todo.find({}).populate("user", {
    username: 1,
    id: 1,
  });

  // search user in DB
  const user = await User.findById(token.id);

  // check what type of user made the request
  if (!user) {
    res.status(401).json("this user doesn't exist");
  } else if (user.isAdmin) {
    res.status(200).send(todos);
  } else {
    const todosByUser = todos.filter((todo) => todo.user?.id === token.id);
    res.status(200).send(todosByUser);
  }
});

// create a new TODO
todosRouter.post("/", auth, async (req, res) => {
  // get TODO data from client side
  const { todo } = req.body;

  const token = req.token;
  // search user in DB by token id
  const user = await User.findById(token.id);

  // create a new TODO in DB
  const newTodo = new Todo({
    todo,
    complete: false,
    user: user._id,
  });

  // saved new TODO in DB
  const saved = await newTodo.save();
  // saved new TODO in user todos
  user.todos = user.todos.concat(saved._id);
  await user.save();

  // send TODO to client side
  res.status(201).send(saved);
});

// delete a TODO
todosRouter.delete("/:id", auth, async (req, res) => {
  const token = req.token;

  // get TODO id from client side
  const { id } = req.params;
  // search TODO in DB
  const todo = await Todo.findById(id);

  // check what type of user made the request
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

// modify TODO
todosRouter.put("/:id", auth, async (req, res) => {
  // get TODO id from client side
  const { id } = req.params;

  // get TODO data from client side
  const { todo, complete } = req.body;

  const token = req.token;
  // search TODO by id
  const todoDB = await Todo.findById(id);

  // create an object with new data for TODO
  const newTodo = {
    todo,
    complete,
  };

  // check what type of user made the request
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
