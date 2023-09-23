const HttpError = require("../helpers/HttpErrors");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Contact } = require("../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  // console.log(page, "   ",limit);
  const skip = (page - 1) * limit;
  const result = await Contact.find({owner}).skip(skip).limit(limit);
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  // console.log("req.user >>>>>>", req.user);
  const { _id: owner } = req.user;
  console.log(" owner >>>>>>", owner);
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) throw HttpError(404, "Not found");
  res.status(200).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) throw HttpError(404, "Not found");
  res.status(201).json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) throw HttpError(404, "Not found");
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
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
