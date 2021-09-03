import Contact from "./models/Contact";
import TimelineItem from "./models/TimelineItem";

const createContact = async (values) => {
  console.log(values);
  
  let rawData;
  try {
    rawData = await fetch('http://localhost:8000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  } catch(e) {
    console.error('Error', e);
  }

  let data = await rawData.json();
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

const updateContact = (contact = {}) => {
  console.log(`Updating contact.. ${contact.firstName}`);
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