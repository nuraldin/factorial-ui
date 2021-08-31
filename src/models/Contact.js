class Contact {
  constructor(obj) {
    this.id = obj._id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.phoneNumber = obj.phoneNumber;
  }

  toRequestObject() {
    this._id = this.id;
    delete this.id;
    return this;
  }
}

export default Contact;