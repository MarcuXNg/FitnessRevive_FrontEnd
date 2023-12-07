import {Outlet, Navigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import React from 'react';

const RequireAuth = () => {
  const {auth} = useAuth();

  // console.log(auth);
  if (auth && auth.isAuthenticated === true) {
    return (
      <main className="PrivateRouter">
        <Outlet />
      </main>
    );
  } else {
    return <Navigate to='/login'></Navigate>;
  }
};

export default RequireAuth;
