/* eslint-disable no-useless-escape */
const NAME = /^[a-z ,.'-]+.{4,32}$/i;
const USERNAME = /^(?=.*[0-9])(?=.*[a-z]).{5,16}$/;
const PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|]).{8,32}$/;
const EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const MIMETYPE = /^image\/+(jpe?g|png)$/i;

function isvName(name) {
  return NAME.test(name);
}
function isvUsername(username) {
  return USERNAME.test(username);
}
function isvPassword(password) {
  return PASSWORD.test(password);
}
function isvEmail(email) {
  return EMAIL.test(email);
}
function isvImage(imageType) {
  return MIMETYPE.test(imageType);
}

module.exports = {
  isvName,
  isvEmail,
  isvImage,
  isvPassword,
  isvUsername,
};
