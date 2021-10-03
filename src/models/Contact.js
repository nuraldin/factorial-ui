class Contact {
  constructor(obj) {
    this._id = obj._id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.phoneNumber = obj.phoneNumber;
  }
}

export default Contact;