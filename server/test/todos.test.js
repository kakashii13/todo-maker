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
    const id = "6379062ba6373dac3d94b2a1";

    await api.delete(`/api/todos/${id}`).expect(204);
  });
  it("updated todo", async () => {
    const todo = {
      todo: " test desde test",
      complete: true,
    };
    const id = "6379062ba6373dac3d94b2a1";
    await api.put(`/api/todos/${id}`).send(todo).expect(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
