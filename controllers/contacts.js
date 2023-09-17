const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpErrors");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Contact } = require("../models/contact")

const listContacts = async (req, res) => {
  console.log("list contact >>>>>>>>>>");
  const result = await Contact.find();
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  console.log("add contacts >>>>>>>>>>");
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  console.log('getcont >>>>> ',id);
  const result = await Contact.findById(id);
  if (!result) throw HttpError(404, "Not found");
  res.status(200).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  console.log("updateContact >>>>> ", id);
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) throw HttpError(404, "Not found");
  res.status(201).json(result);
}

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  console.log("updateFavorite >>>>> ", id);
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) throw HttpError(404, "Not found");
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  console.log("removeContact >>>>> ", id);
  const result = await Contact.findByIdAndRemove(id);
  if (!result) throw HttpError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
