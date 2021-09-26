import EmailExistsError from "../../models/errors/EmailExistsError";
import fetchWrapper from "../fetch";

const createContact = async (formData) => {
  try {
    let [data, ok] = await fetchWrapper('/contacts', formData, 'POST');
    
    if( !ok ) {
      if ( data.payload.email ) throw new EmailExistsError(`There is already the same email in db.`) ;
      else throw new Error(`There is another error in request.`);
    }

    return data;
  } catch(e) {
    console.error('Error', e);
  }
};

export default createContact;