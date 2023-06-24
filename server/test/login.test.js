require("dotenv").config();
const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");

const api = supertest(app);

it("should be logged", async () => {
  const userTest = {
    email: process.env.LOGIN_TEST_USER_EMAIL,
    password: process.env.LOGIN_TEST_PASSWORD,
  };

  await api.post("/api/login").send(userTest).expect(200);
});

afterAll(() => {
  mongoose.connection.close();
});

it("shouldn't be logged", async () => {
  const userCredentials = {
    email: process.env.LOGIN_TEST_USER_EMAIL,
    password: process.env.LOGIN_TEST_PASSWORD,
  };

  await api.post("/api/login").send(userCredentials).expect(401);
});
