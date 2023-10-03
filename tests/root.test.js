const request = require("supertest");
const app = require("../app");

describe("Root path", () => {
  test("It should get the root path with app is running", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("APP is running");
  });
});
