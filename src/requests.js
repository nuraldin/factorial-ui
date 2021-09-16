import { EmailExistsError } from "./errors";
import Contact from "./models/Contact";
import TimelineItem from "./models/TimelineItem";

const createContact = async (formData) => {
  let response;
  try {
    response = await fetch('http://localhost:8000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  } catch(e) {
    console.error('Error', e);
  }

  let data = await response.json();
  if( !response.ok ) {
    if ( data.email ) {
      throw new EmailExistsError(`There is already the same email in db.`) ;
    } else {
      throw new Error(`There is another error in request.`);
    }
  }

  return data;
};

const deleteContact = async (contactId) => {
  try {
    await fetch(`http://localhost:8000/contacts/${contactId}`, {
      method: 'DELETE',
    });
  } catch(e) {
    console.error('Error:', e);
  }
};

const updateContact = async (contactData) => {
  console.log(contactData);
  try {
    await fetch('http://localhost:8000/contacts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData.toRequestObject()),
    });
  } catch(e) {
    console.error('Error', e);
  }
};

const getContacts = async () => {
  let rawData = await fetch('http://localhost:8000/contacts');
  let data = await rawData.json();

  let contacts = data.map( contact => {
    return new Contact(contact);
  })

  return contacts;
};

const getTimeline = async () => {
  let rawData = await fetch('http://localhost:8000/history');
  let data = await rawData.json();

  let timeline = data.map( timeline => {
    return new TimelineItem(timeline);
  })

  return timeline;
};

export {
  updateContact,
  createContact,
  deleteContact,
  getContacts,
  getTimeline
}