import init from './initializer.js';

init();

/* *
 * Dom Queries
 *
 *  *  */

const form = document.forms['register-form'];
const signupLink = document.querySelector('.signup');
const signinLink = document.querySelector('.signin');
const registerForm = document.querySelector('.register-form_div');
const loginForm = document.querySelector('.login-form_div');

form.addEventListener('submit', submitForm);
signupLink.addEventListener('click', showRegisterForm);
signinLink.addEventListener('click', showloginForm);


async function submitForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const inputs = {};
  inputs.name = data.get('name');
  inputs.email = data.get('email');
  inputs.password = data.get('password');
  inputs.phone = data.get('phone');

  const validate = validateInputs(inputs);
  if (validate !== null) {
    /* show validation error here ..... */
    return;
  }

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.status === 404) {
      return console.log(`already registered: ${response}`); /*
      handle user is already registered alert here
    */ }


    const resData = await response.json();

    if (resData) { document.location.href = '/'; }
    console.log(resData);
  } catch (err) {
    console.log(err);
  }
}

/**
 * helper function for validating inputs
 *
 * @param {Object} data: object that containes inputs: name | email | password | phone
 * @returns Error object if validation failed and null if passed
 */
function validateInputs(data) {
  /* this function is very fragile */
  const {
    name, email, password, phone,
  } = data;
  const err = [];

  if (name === '') {
    err.push({ name: 'name', message: ['name is required'] });
  }
  if (name.length >= 50) {
    if (checkIfExists(err, 'name')) { err[0].message.push('name is too long'); } else { err.push({ name: 'name', message: ['name is too long'] }); }
  }
  if (name.length <= 3 && name !== '') {
    if (checkIfExists(err, 'name')) { err[0].message.push('name is too long'); } else { err.push({ name: 'name', message: ['name is too short'] }); }
  }

  if (email === '') {
    err.push({ email: 'email', message: ['email is required'] });
  }
  if (email.length >= 50) {
    if (checkIfExists(err, 'email')) { err[1].message.push('email is too long'); } else { err.push({ name: 'email', message: ['email is too long'] }); }
  }
  if (email.length <= 3 && email !== '') {
    if (checkIfExists(err, 'email')) { err[1].message.push('email is too long'); } else { err.push({ name: 'email', message: ['email is too short'] }); }
  }


  if (password === '') {
    err.push({ name: 'password', message: ['password is required'] });
  }
  if (password.length >= 20) {
    if (checkIfExists(err, 'password')) { err[2].message.push('password is too long'); } else { err.push({ name: 'password', message: ['password is too long'] }); }
  }
  if (password.length <= 4 && pasword !== '') {
    if (checkIfExists(err, 'password')) { err[2].message.push('password is too long'); } else { err.push({ name: 'password', message: ['password is too short'] }); }
  }

  function checkIfExists(array, name) {
    let result = false;
    array.forEach((e) => {
      if (e.name === name) { result = true; }
    });
    return result;
  }


  if (err.length === 0) return null;
  return err;
}

function showRegisterForm(e) {
  e.preventDefault();
  e.target.parentElement.parentElement.style.display = 'none';
  registerForm.style.display = 'flex';
  console.dir(document.querySelector('.register-form_div'));
}
function showloginForm(e) {
  e.preventDefault();
  e.target.parentElement.parentElement.style.display = 'none';
  loginForm.style.display = 'flex';
  console.dir(document.querySelector('.register-form_div'));
}
