const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpErrors");
const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const listContacts = async (req, res, next) => {
  try {
    res.status(200).json(await contacts.listContacts());
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) throw HttpError(404, "Not found");
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) throw HttpError(404, "Not found");
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
