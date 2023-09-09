const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contacts = require("./models/contacts.json");
const fs = require("fs/promises");
const moment = require("moment");

const contactsRouter = require("./routes/api/contacts");

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

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  res.json(contacts[0]);
});

app.post("/api/contacts", (req, res) => {
  res.json(contacts[1]);
});

app.delete("/api/contacts/:id", (req, res) => {
  res.json(contacts[2]);
});

app.put("/api/contacts/:id", (req, res) => {
  res.json(contacts[3]);
});

// @ POST /api/contacts
// @ DELETE /api/contacts/:id
// @ PUT /api/contacts/:id

// app.get("/api/contacts", (req, res) => {
//   console.log(req.method);
//   console.log(req.url);
//   res.json(contacts);
//   // res.send(contacts);
// });

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
