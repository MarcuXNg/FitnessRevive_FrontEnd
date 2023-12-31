import {Outlet} from 'react-router-dom';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AdminLayout = () => {
  return (
    <main className="container mx-auto grid grid-rows-1 gap-[1.8rem] grid-cols-[12rem,auto,23rem] px-4 pt-[90px] max-w-[1920px]">
      <Sidebar/>
      <Outlet />
    </main>
  );
};

export default AdminLayout;
