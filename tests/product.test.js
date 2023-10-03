const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");
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

describe("Products routes activity", () => {
  it("should get all products", async () => {
    const response = await request(app)
      .get("/api/product/get-products")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Should create a product", async () => {});
  it("Should get a particaular product", async () => {
    const response = await request(app)
      .get(`/api/product/get-product/651c4e4d2dda7d52b92bef9f`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
