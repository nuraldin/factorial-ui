import fetchWrapper from "../fetch";

const deleteContact = async (contactId) => {
  try {
    await fetchWrapper(`/contacts/${contactId}`, null, 'DELETE');
  } catch(e) {
    console.error('Error:', e);
  }
};

export default deleteContact;