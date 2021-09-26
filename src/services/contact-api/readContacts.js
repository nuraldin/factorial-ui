import { Contact } from "../../models";
import fetchWrapper from "../fetch";

const getContacts = async () => {
  let [data, _] = await fetchWrapper('/contacts');
  return data.payload.map( contact => new Contact(contact));
};

export default getContacts;