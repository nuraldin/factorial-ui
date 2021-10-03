const validPhone = /^[0-9]{9}$/;
const validEmail = /^\w+\.?\w+@\w+(.com){1}$/;
const validName = /^\w+ \w+$/;
const validWord = /^(\w|ñ|é|ó|á|í|ú|ü)+$/;

const validators = {
  NAME: validName,
  EMAIL: validEmail,
  PHONE: validPhone,
  WORD: validWord
};

// toggle a banner
const toggle = ( fn ) => () => {
  setTimeout(() => {
    fn(false);
  }, 2000);
  fn(true) 
}

// validator
const validateAndSave = (value = '', { 
  validator = /.*/, 
  onFail = () => {}, 
  onSuccess = () => {} }
) => validator.test(value) ? onSuccess(value) : onFail();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); // delay util
const pipe  = (...fns) => (init)  => fns.reduce(async (arg, fn) => fn(await arg), init); // fp pipe

const utils = {
  validators,
  toggle,
  validateAndSave,
  delay,
  pipe
};

export default utils;