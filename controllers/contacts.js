const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpErrors");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const Contact = require("../models/contact")

const listContacts = async (req, res) => {
  res.status(200).json(await Contact.find());
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const listContacts = async (req, res) => {
//   res.status(200).json(await contacts.listContacts());
// };

// const getContactById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.getContactById(id);
//   if (!result) throw HttpError(404, "Not found");
//   res.status(200).json(result);
// };

// const addContact = async (req, res) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const removeContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.removeContact(id);
//   if (!result) throw HttpError(404, "Not found");
//   res.status(200).json({ message: "contact deleted" });
// };

// const updateContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.updateContact(id, req.body);
//   if (!result) throw HttpError(404, "Not found");
//   res.status(201).json(result);
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  // getContactById: ctrlWrapper(getContactById),
  // removeContact: ctrlWrapper(removeContact),
  // updateContact: ctrlWrapper(updateContact),
};
