class EmailExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Email Already Exists';
  }
}

export default EmailExistsError;