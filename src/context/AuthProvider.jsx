/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {createContext, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {updateToken, updateUserData, setError, updateLoadingState} from '../hooks/authSlice.js';
import useInstance from '../setup/instance';
import PropTypes from 'prop-types'; // Import PropTypes


const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const {instance, controller} = useInstance();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const response = await instance.get(`/account`);

      if (response && response.data && +response.data.EC === 0) {
        const rolesWithPermission = response.data.DT.rolesWithPermission;
        const email = response.data.DT.email;
        const username = response.data.DT.username;
        const token = response.data.DT.access_token;

        dispatch(updateUserData({rolesWithPermission, email, username}));
        dispatch(updateLoadingState());
        dispatch(updateToken({token}));
      } else {
        dispatch(setError());
        console.log('Failed to fetch user data:', response);
      }
    } catch (error) {
      dispatch(setError());
      console.error('Error fetching user data:', error);
    } finally {
      controller.abort();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};

// Add prop validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {AuthContext, AuthProvider};
