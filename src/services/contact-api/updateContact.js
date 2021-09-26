import fetchWrapper from "../fetch";

const updateContact = async (contactData) => {
  try {
    await fetchWrapper('/contacts', contactData.toRequestObject(), 'PUT');
  } catch(e) {
    console.error('Error', e);
  }
};

export default updateContact;
