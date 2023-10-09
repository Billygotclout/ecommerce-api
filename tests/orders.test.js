const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");
const path = require("path");

let token;
let orderId;
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

describe("Test orders", () => {
  test("view all orders", async () => {
    const response = await request(app)
      .get("/api/orders/view-orders")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Orders Successfully Fetched");
  }, 30000);
  test("create an order", async () => {
    const response = await request(app)
      .post("/api/orders/create-order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product_id: "651c4ea79860ef8cb06c6b04",
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Order Successfully Created");
    orderId = response.body.data._id;
  }, 30000);
  test("Delete an order", async () => {
    const response = await request(app)
      .delete(`/api/orders/delete-order/${orderId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully Deleted Order");
  }, 3000);
});
