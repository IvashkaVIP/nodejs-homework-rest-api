const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require('./routes/api/contacts');

// const contacts = require("./models/contacts.json");
const fs = require("fs/promises");
const moment = require("moment");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  const { url, method } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("./server.log", `\n${date} ${method} ${url}`);
  next();
});

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json(message);
});

module.exports = app;
