const fs = require("fs/promises");
const path = require("path");
const { nanoid, customAlphabet } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (contact) {
    return contact;
  }
  return null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = await getContactById(contactId);
  newList = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newList));
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const nanoid = customAlphabet("123456789", 2);
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
