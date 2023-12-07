// import axios from "axios";
import axios from '../setup/axios.js';

// Register
const registerNewUSer = async (email, password, firstname, lastname) => {
  return await axios.post('/api/v1/register', {
    email, password, firstname, lastname,
  });
};

// Login
const loginUser = async (ValueLogin, PasswordLogin) => {
  return await axios.post('/api/v1/login', {
    ValueLogin, PasswordLogin,
  });
};

// fetch authenticated
const getUserAccount = async () => {
  return await axios.get(`/api/v1/account`);
};

export {
  registerNewUSer,
  loginUser,
  getUserAccount,
};
