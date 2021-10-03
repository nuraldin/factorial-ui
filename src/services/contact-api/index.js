import getContacts from "./readContacts";
import getTimeline from "./readTimeline";
import updateContact from "./updateContact";
import deleteContact from "./deleteContact";
import createContact from "./createContact";

const api = {
  getContacts,
  getTimeline,
  createContact,
  updateContact,
  deleteContact
}

export default api;