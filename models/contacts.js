const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const listContacts = JSON.parse(await fs.readFile(contactsPath));
  return listContacts;
}

async function getContactById(contactId) {
  const contactById = (await listContacts()).find(
    (item) => item.id === contactId
  );
  return contactById || null;
}

async function addContact(body) {
  const newContact = { id: nanoid(), ...body };
  const newList = await listContacts();
  newList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const result = contacts[index];
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  const result = contacts[index];
  return (result);
  
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};

