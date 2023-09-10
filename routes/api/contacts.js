const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts");
const HttpError = require('../../helpers/HttpErrors')
const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await contacts.listContacts());
  } catch (err) {
    next(err)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result)       
      throw HttpError(404,"Not found");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);  
  }
  

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
