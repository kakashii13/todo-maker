const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");

const api = supertest(app);

it("should be logged", async () => {
  const userTest = {
    email: "test@test.com",
    password: "test",
  };

  await api.post("/api/login").send(userTest).expect(200);
});

afterAll(() => {
  mongoose.connection.close();
});

it("shouldn't be logged", async () => {
  const userCredentials = {
    email: "test@tes.com",
    password: "tes",
  };

  await api.post("/api/login").send(userCredentials).expect(401);
});
