import Contact from "./models/Contact";

const createContact = (values) => {
  fetch('https://localhost:8000/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

const deleteContact = (contactId) => {
  fetch(`https://localhost:8000/contacts/${contactId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  console.log(`Deleting contact.. ${contactId}`);
};

const updateContact = (contact = {}) => {
  console.log(`Updating contact.. ${contact.firstName}`);
};

const getContacts = async () => {
  let rawData = await fetch('http://localhost:8000/contacts');
  let data = await rawData.json();

  console.log(data);
  let contacts = data.map( contact => {
    return new Contact(contact);
  })
  console.log(contacts);

  return contacts;
};

export {
  updateContact,
  createContact,
  deleteContact,
  getContacts
}