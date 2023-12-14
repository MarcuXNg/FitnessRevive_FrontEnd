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

// Logout
const logoutUser = async () => {
  return await axios.post('/api/v1/logout');
};

// fetch authenticated
const getUserAccount = async () => {
  return await axios.get(`/api/v1/account`);
};

// GET ALL USERS
const fetchAllUser = async (page, limit) => {
  return await axios.get(`/api/v1/users/read?page=${page}&limit=${limit}`);
};

const deleteUser = async (user) => {
  const userId = user.User.id;
  // console.log(userId);
  return await axios.delete(`/api/v1/users/delete`, {data: {id: userId}});
};


export {
  registerNewUSer,
  loginUser,
  getUserAccount,
  logoutUser,
  fetchAllUser,
  deleteUser,
};
