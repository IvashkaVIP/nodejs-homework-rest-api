const app = require("./app");
const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Volodymyr:pPUbKXGqZ86zXBwY@cluster0.1tdggh2.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((err) => console.log(err.message));

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
// mongodb+srv://Volodymyr:pPUbKXGqZ86zXBwY@cluster0.1tdggh2.mongodb.net/