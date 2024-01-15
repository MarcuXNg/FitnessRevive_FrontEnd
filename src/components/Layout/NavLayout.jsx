import React from 'react';
import {Outlet} from 'react-router-dom';
import NavHeader from '../Navigation/Nav';

const NavLayout = () => {
  return (
    <main className='app-header'>
      <NavHeader />
      <Outlet />
    </main>
  );
};

export default NavLayout;
