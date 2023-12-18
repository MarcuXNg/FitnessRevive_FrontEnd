// import axios from "axios";
import axios from '../setup/axios.js';

// Register
const registerNewUser = async (email, password, firstname, lastname) => {
  try {
    return await axios.post('/api/v1/register', {
      email, password, firstname, lastname,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login
const loginUser = async (ValueLogin, PasswordLogin) => {
  try {
    return await axios.post('/api/v1/login', {
      ValueLogin, PasswordLogin,
    });
  } catch (error) {
    console.log(error);
  }
};

// Logout
const logoutUser = async () => {
  try {
    return await axios.post('/api/v1/logout');
  } catch (error) {
    console.log(error);
  }
};

// fetch authenticated
const getUserAccount = async () => {
  try {
    return await axios.get(`/api/v1/account`);
  } catch (error) {
    console.log(error);
  }
};

// GET ALL USERS
const fetchAllUser = async (page, limit) => {
  try {
    return await axios.get(`/api/v1/users/read?page=${page}&limit=${limit}`);
  } catch (error) {
    console.log(error);
  }
};

// delete User
const deleteUser = async (user) => {
  try {
    const userId = user.id;
    // console.log(userId);
    return await axios.delete(`/api/v1/users/delete`, {data: {id: userId}});
  } catch (error) {
    console.log(error);
  }
};

// Group fetch
const fetchGroup = async () => {
  try {
    return await axios.get(`/api/v1/group/read`);
  } catch (error) {
    console.log(error);
  }
};

// userCreate
const createNewUser = async (userData) => {
  try {
    return await axios.post(`/api/v1/users/create`, {...userData});
  } catch (error) {
    console.log(error);
  }
};

export {
  registerNewUser,
  loginUser,
  getUserAccount,
  logoutUser,
  fetchAllUser,
  deleteUser,
  fetchGroup,
  createNewUser,
};
