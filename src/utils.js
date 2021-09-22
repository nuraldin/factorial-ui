// validators
const validPhone = /^[0-9]{9}$/;
const validEmail = /^\w+\.?\w+@\w+(.com){1}$/;
const validName = /^\w+ \w+$/;

const validators = {
  NAME: validName,
  EMAIL: validEmail,
  PHONE: validPhone
};

// toggle a banner
const toggle = ( fn ) => () => {
  setTimeout(() => {
    fn(false);
  }, 2000);
  fn(true) 
}

// validator
const validateAndSave = (value = '', { validator = /.*/, onFail = () => {}, onSuccess = () => {} }) => {
  if ( !(validator.test(value)) ) onFail();
  else onSuccess(value);
};

export {
  validators,
  toggle,
  validateAndSave
};