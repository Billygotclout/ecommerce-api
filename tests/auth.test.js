const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYmdjIiwicGFzc3dvcmQiOiIkMmIkMTAkdVdZQ2dHN3c2QUpYNXRqeC5FTi5vLjFZLzhUYmNyeHZ2U1dZLmNMZkg2bjlYa3d6LzZib0MiLCJpZCI6IjY1MTlhZTU2MzcwMGU3NjQ0ZjYzY2U5NiJ9LCJpYXQiOjE2OTYzNTE3MDN9.s6-l_mJm9PLj1mYO-yWCQpYisR4P2y6MbTGrrjfqrDU";
beforeAll(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 30000);
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Authentication flow", () => {
  // test("It should register a new user and respond with a 201 response", async () => {
  //   const payload = {
  //     firstName: "Demilade",
  //     lastName: "Williams",
  //     username: "bgc",
  //     email: "wwww@gmail.com",
  //     password: "tols56789",
  //   };
  //   const response = await request(app)
  //     .post("/api/auth/register")
  //     .send(payload);
  //   expect(response.status).toBe(201);
  // expect(response.body.message).toBe("User successfully created");
  // }, 30000);
  test("it should login the user and return a 200 response", async () => {
    const payload = {
      username: "bgc",
      password: "tols56789",
    };
    const response = await request(app).post("/api/auth/login").send(payload);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User successfully logged in");
  }, 30000);
  test("it should get user details", async () => {
    const response = await request(app)
      .get("/api/auth/current-user")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User Successfully fetched");
  }, 30000);
});
