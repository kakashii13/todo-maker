require("dotenv").config();
const app = require("../app");
const Todo = require("../models/todo");
const supertest = require("supertest");
const mongoose = require("mongoose");

const api = supertest(app);

describe("init without todos", () => {
  beforeEach(async () => {
    // await Todo.deleteMany({});
  });

  it("add todo", async () => {
    const todo = {
      todo: "first test",
      complete: false,
    };

    await api.post("/api/todos").send(todo).expect(201);
  });
  it("delete todo", async () => {
    const id = process.env.ID_TODO_TEST;

    await api.delete(`/api/todos/${id}`).expect(204);
  });
  it("updated todo", async () => {
    const todo = {
      todo: process.env.TEXT_TODO_TEST,
      complete: true,
    };
    const id = process.env.ID_TODO_TEST;
    await api.put(`/api/todos/${id}`).send(todo).expect(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
