// import axios from "axios";
import axios from '../setup/axios.js';

// Register
const registerNewUser = async (email, password, firstname, lastname) => {
  try {
    return await axios.post('/register', {
      email, password, firstname, lastname,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login
const loginUser = async (ValueLogin, PasswordLogin) => {
  try {
    return await axios.post('/login', {
      ValueLogin, PasswordLogin,
    });
  } catch (error) {
    console.log(error);
  }
};

// Logout
const logoutUser = async () => {
  try {
    return await axios.post('/logout');
  } catch (error) {
    console.log(error);
  }
};

// fetch authenticated
const getUserAccount = async () => {
  try {
    return await axios.get(`/account`);
  } catch (error) {
    console.log(error);
  }
};

// GET ALL USERS
const fetchAllUser = async (page, limit) => {
  try {
    return await axios.get(`/users/read?page=${page}&limit=${limit}`);
  } catch (error) {
    console.log(error);
  }
};

// delete User
const deleteUser = async (user) => {
  try {
    const userId = user.id;
    // console.log(userId);
    return await axios.delete(`/users/delete`, {data: {id: userId}});
  } catch (error) {
    console.log(error);
  }
};

// Group fetch
const fetchGroup = async () => {
  try {
    return await axios.get(`/group/read`);
  } catch (error) {
    console.log(error);
  }
};

// userCreate
const createNewUser = async (userData) => {
  try {
    // console.log(userData);
    return await axios.post(`/users/create`, {...userData});
  } catch (error) {
    console.log(error);
  }
};

// update user
const updateCurrentUser = async (userData) => {
  try {
    // console.log('check push data:', userData);
    return await axios.put(`/users/update`, {...userData});
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
  updateCurrentUser,
  createNewUser,
};
