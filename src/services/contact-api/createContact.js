import EmailExistsError from "../../models/errors/EmailExistsError";
import fetchWrapper from "../fetch";

const createContact = async (formData) => {
  let data, ok;
  
  try {
    [data, ok] = await fetchWrapper('/contacts', formData, 'POST');
  } catch (e) {
    console.error(e);
  }
    
  if( !ok ) {
    if ( data.payload.email ) throw new EmailExistsError(`There is already the same email in db.`) ;
    else throw new Error(`There is another error in request.`);
  }

  return data;
};

export default createContact;