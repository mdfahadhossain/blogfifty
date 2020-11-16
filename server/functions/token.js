const { sign, verify } = require('jsonwebtoken');
const { hashSync, compareSync } = require('bcryptjs');

const login_secret = 'string';
const email_secret = 'string';

function signLogin(id, username, email, hours = 168) {
  return sign({ id, username, email, expires: Date.now() + hours * 3600000 }, login_secret, { expiresIn: '7d' });
}
function verifyLogin(token) {
  return verify(token, login_secret);
}
function signEmail(id, email) {
  return sign({ id, email }, email_secret);
}
function verifyEmail(token) {
  return verify(token, email_secret);
}
function createHash(password) {
  return hashSync(password, 10);
}
function checkHash(password, hash) {
  return compareSync(password, hash);
}

module.exports = {
  signLogin,
  verifyLogin,
  signEmail,
  verifyEmail,
  createHash,
  checkHash,
};
