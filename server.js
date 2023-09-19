const app = require("./app");
const mongoose = require("mongoose");
// const { DB_HOST } = require("./config");
const {SECRET_KEY, DB_HOST, PORT=3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
    console.log("sk >>>>>>>>>>>>   ", SECRET_KEY," >>> ",PORT, " >>> ", DB_HOST);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });


