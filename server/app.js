require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const { unknownError, handleErrors } = require("./utils/middleware");

const todosRouter = require("./controllers/todos");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const signRouter = require("./controllers/signup");

const connectMongoose = async () => {
  await mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connected to mongodb");
  });
};

connectMongoose();

app.use(express.json());
app.use(cors());

app.use("/api/login", loginRouter);
app.use("/api/signup", signRouter);
app.use("/api/todos", todosRouter);
app.use("/api/users", userRouter);
app.use(unknownError);
app.use(handleErrors);

module.exports = app;
