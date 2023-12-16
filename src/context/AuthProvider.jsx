/* eslint-disable react/prop-types */
import React, {createContext, useEffect, useState} from 'react';
import {getUserAccount} from '../services/userService';
import {useLocation} from 'react-router-dom';

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const location = useLocation();
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
    const response = await getUserAccount();

    if (response && +response.EC === 0) {
      const groupWithRoles = response.DT.groupWithRoles;
      const email = response.DT.email;
      const username = response.DT.username;
      const token = response.DT.access_token;

      const data = {
        isAuthenticated: true,
        token,
        account: {groupWithRoles, email, username},
        isLoading: false,
      };

      setAuth(data);
      // // Log the data
      // console.log('Fetch User Data:', data);
    } else {
      setAuth({...userDefault, isLoading: false});
    }
  };

  // define những router đã defined
  const validRoutes = [
    '/',
    '/about',
    '/FAQ',
    '/users',
    '/admin',
    '/admin/users',
    '/admin/roles',
    '/admin/analytics',
    '/admin/tickets',
    '/users/edit',
  ];

  useEffect(() => {
    // console.log(location.pathname);
    const isPathValid = validRoutes.includes(location.pathname);
    if (location && location.pathname !== '/login' && isPathValid) {
      fetchUser();
      // console.log('fetch');
    } else {
      setAuth((prevAuth) => ({...prevAuth, isLoading: false}));
    }
  }, [location]);

  return (
    <AuthContext.Provider value={{auth, loginContext, logoutContext}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
