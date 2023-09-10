const express = require("express");
const router = express.Router();
// const contacts = require("../../models/contacts.json");
const contacts = require("../../models/contacts")

router.get("/", async (req, res) => {
  res.json(await contacts.listContacts());
});

router.get("/:id", async (req, res) => {
  res.json(await contacts.getContactById("qdggE76Jtbfd9eWJHrssH"));
});

router.post("/", async (req, res) => {
  res.json(await contacts.addContact({name: "Mihaylo", phone: "(123)45678910", email: "miha@mail.com"}));
});

router.delete("/:id", async (req, res) => {
  res.json(await contacts.removeContact("1"));
});

router.put("/:id", async (req, res) => {
  res.json(
    await contacts.updateContact("m2FZmeg6fiZH9FqEpAans", {
      name: "Mihaylo",
      phone: "(123)888888888888888",
      // email: "miha@mail.com",
    })
  );
});

module.exports = router;
