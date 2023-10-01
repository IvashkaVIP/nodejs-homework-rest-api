const app = require("../app");
const request = require("supertest");

const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;

describe("test SignUp function", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then(() => {
        app.listen(PORT);
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.log(err.message);
        process.exit(1);
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  const user = { email: "Petro@mail.com", password: "1234567890" };
  let result;

  test("the response must have status code 200", async () => {
    result = await request(app).post("/api/users/login").send(user);
    expect(result.status).toBe(200);
  });

  test("the response must contain a token", () => {
    expect(result.body).toHaveProperty("token");
  });

  test("the response should return a 'user' object with 2 fields: 'email' and 'subscription' with data type 'String'", () => {
    expect(result.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});
