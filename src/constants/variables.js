/* eslint-disable no-useless-escape */
const NAME = /^[a-z ,.'-]+.{4,32}$/i;
const USERNAME = /^(?=.*[0-9])(?=.*[a-z]).{5,16}$/;
const PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|]).{8,32}$/;
const EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const MIMETYPE = /^image\/+(jpe?g|png)$/i;

export function authHeader() {
  return { Authorization: `Bearer ${localStorage.getItem('auth_key')}` };
}
export function backend() {
  return process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2000' : '';
}
export function isvName(name) {
  return NAME.test(name);
}
export function isvUsername(username) {
  return USERNAME.test(username);
}
export function isvPassword(password) {
  return PASSWORD.test(password);
}
export function isvEmail(email) {
  return EMAIL.test(email);
}
export function isvImage(type) {
  return MIMETYPE.test(type);
}
