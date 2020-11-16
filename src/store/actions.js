import Axios from 'axios';

import { backend } from '../constants/variables';
import { SIGNUP, SIGNIN, FORGOT, AUTO_LOGIN, LOGOUT, SET_AUTH } from './type';

export function setAuth(payload) {
  return { type: SET_AUTH, payload };
}
export function auto(payload) {
  return { type: AUTO_LOGIN, payload };
}
export function signup(name, username, email, password, cpassword) {
  return {
    type: SIGNUP,
    payload: Axios.post(`${backend()}/auth/signup`, { name, username, email, password, cpassword, date: new Date().toISOString() }),
  };
}
export function signin(user, password) {
  return { type: SIGNIN, payload: Axios.post(`${backend()}/auth/signin`, { user, password }) };
}
export function forgot(user) {
  return { type: FORGOT, payload: Axios.post(`${backend()}/auth/forgot`, { user }) };
}
export function logout() {
  return { type: LOGOUT };
}
