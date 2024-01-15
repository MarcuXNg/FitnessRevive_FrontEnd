import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React from 'react';

const RequireAuth = () => {
  const auth = useSelector((state) => state.auth);


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
