const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");
const path = require("path");
let token;
let productId;
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
beforeEach(async () => {
  const payload = {
    username: "bgc",
    password: "tols56789",
  };

  const response = await request(app).post("/api/auth/login").send(payload);

  expect(response.status).toBe(200);
  expect(response.body.token).toBeDefined();

  token = response.body.token;
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
      .field("category", "food")
      .attach("image", pathh)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product successfully created");
    productId = response.body.data._id;
  }, 30000);
  it("Should get a particular product", async () => {
    const response = await request(app)
      .get(`/api/product/get-product/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product successfully fetched");
  }, 30000);
  it("Should update a particular product", async () => {
    const response = await request(app)
      .patch(`/api/product/update-product/${productId}`)
      .send({
        title: "Ope",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully Updated Product");
  }, 30000);
  it("Should delete aq product", async () => {
    const response = await request(app)
      .delete(`/api/product/delete-product/${productId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully Deleted Product");
  }, 30000);
});
