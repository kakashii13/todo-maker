const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const axios = require("axios");

const api = supertest(app);

test("shouldn't return a list of users", async () => {
  const authRes = await axios.post("http://localhost:3000/api/login", {
    email: "test@test.com",
    password: "test",
  });

  const token = authRes.data.token;
  await api
    .get("/api/users")
    .set("Authorization", `Bearer ${token}`)
    .expect(401);
});

test("create user", async () => {
  const newUser = {
    username: "test",
    email: "test@test.com",
    password: "test",
  };

  await api.post("/api/signup").send(newUser).expect(201);
});

test("user to be unique", async () => {
  const user = {
    username: "test",
    email: "test@test.com",
    password: "test",
  };

  await api.post("/api/signup").send(user).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
