import { SIGNUP, PENDING, SIGNIN, FULFILLED, REJECTED, AUTO_LOGIN, LOGOUT, SET_AUTH } from './type';

const initState = {
  loggedIn: false,
  name: '',
  username: '',
  email: '',
  avatar: '',
  working: false,
  error: '',
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case AUTO_LOGIN:
      localStorage.setItem('auth_key', payload.token);
      return {
        ...state,
        ...payload,
        working: false,
        error: '',
        loggedIn: true,
      };
    case SIGNUP + PENDING:
      return {
        ...state,
        working: true,
      };
    case SIGNUP + FULFILLED:
      localStorage.setItem('auth_key', payload.data.token);
      return {
        ...state,
        ...payload.data,
        loggedIn: true,
        error: '',
      };
    case SIGNUP + REJECTED:
      return {
        ...state,
        error: payload.response?.data?.message,
        working: false,
      };
    case SIGNIN + PENDING:
      return {
        ...state,
        working: true,
      };
    case SIGNIN + FULFILLED:
      localStorage.setItem('auth_key', payload.data.token);
      return {
        ...state,
        ...payload.data,
        loggedIn: true,
        error: '',
      };
    case SIGNIN + REJECTED:
      return {
        ...state,
        error: payload.response?.data?.message,
        working: false,
      };
    case LOGOUT:
      localStorage.removeItem('auth_key');
      return initState;
    case SET_AUTH:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
