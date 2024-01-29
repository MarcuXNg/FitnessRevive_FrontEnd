/* eslint-disable prefer-const */
import axios from '../setup/axios.js';
import {useDispatch} from 'react-redux';
import {updateToken} from '../hooks/authSlice.js';

// refresh
const useRefreshToken = () => {
  const dispatch = useDispatch();
  let isRefreshing = false;

  const refresh = async () => {
    // If a refresh operation is already in progress, wait for it to complete
    while (isRefreshing) {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay as needed
    }

    try {
      isRefreshing = true;

      const response = await axios.get(`/refresh`);

      if (response && +response.EC === 0) {
        const token = response.DT.access_token;
        if (token) {
          dispatch(updateToken(token));
          return token;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isRefreshing = false;
    }
  };

  return refresh;
};


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

export {
  useRefreshToken,
  registerNewUser,
  loginUser,
  logoutUser,
};

