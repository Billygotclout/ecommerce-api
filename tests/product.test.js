const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");
const path = require("path");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYmdjIiwicGFzc3dvcmQiOiIkMmIkMTAkdVdZQ2dHN3c2QUpYNXRqeC5FTi5vLjFZLzhUYmNyeHZ2U1dZLmNMZkg2bjlYa3d6LzZib0MiLCJpZCI6IjY1MTlhZTU2MzcwMGU3NjQ0ZjYzY2U5NiJ9LCJpYXQiOjE2OTYzNTE3MDN9.s6-l_mJm9PLj1mYO-yWCQpYisR4P2y6MbTGrrjfqrDU";

const pathh = path.join(__dirname, "/err.png");
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
    expect(response.body.message).toBe("Products Succesfully Fetched");
  });
  it("Should create a product", async () => {
    const response = await request(app)
      .post("/api/product/create-product")
      .field("title", "Demilade")
      .field("description", "clout chase")
      .field("price", "50000")
      .attach("image", pathh)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product successfully created");
  }, 30000);
  it("Should get a particular product", async () => {
    const response = await request(app)
      .get(`/api/product/get-product/651d3dd0e817820e7d12ce8f`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product successfully fetched");
  }, 30000);
  it("Should update a particular product", async () => {
    const response = await request(app)
      .patch("/api/product/update-product/651d3dd0e817820e7d12ce8f")
      .send({
        title: "Ope",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully Updated Product");
  }, 30000);
  it("Should update a delete product", async () => {
    const response = await request(app)
      .delete("/api/product/delete-product/651d3dd0e817820e7d12ce8f")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully Deleted Product");
  }, 30000);
});
