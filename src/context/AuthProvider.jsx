/* eslint-disable react/prop-types */
import React, {createContext, useEffect, useState} from 'react';
import {getUserAccount} from '../services/userService';
import {useLocation, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: '',
    account: {},
  };
  const [auth, setAuth] = useState(userDefault);

  const loginContext = (userData) => {
    setAuth({...userData, isLoading: false});
  };

  const logoutContext = () => {
    setAuth({...userDefault, isLoading: false});
  };

  const fetchUser = async () => {
    try {
      const response = await getUserAccount();

      if (response && +response.EC === 0) {
        const rolesWithPermission = response.DT.rolesWithPermission;
        const email = response.DT.email;
        const username = response.DT.username;

        const data = {
          isAuthenticated: true,
          account: {rolesWithPermission, email, username},
          isLoading: false,
        };

        setAuth(data);
      } else {
        setAuth({...userDefault, isLoading: false});
        console.log('Failed to fetch user data:', response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setAuth({...userDefault, isLoading: false});
    }
  };

  useEffect(() => {
    if (location.pathname) {
      fetchUser();
    } else {
      setAuth((prevAuth) => ({...prevAuth, isLoading: false}));
    }
  }, [navigate]);

  // useEffect(() => {
  //   fetchUser();
  // }, []);


  return (
    <AuthContext.Provider value={{auth, loginContext, logoutContext}}>
      {children}
    </AuthContext.Provider>
  );
};

// Add prop validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {AuthContext, AuthProvider};
