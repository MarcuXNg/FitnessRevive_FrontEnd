import React from 'react';
import {HelmetProvider, Helmet} from 'react-helmet-async';
import {useLocation, Link} from 'react-router-dom';

const UserSideBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet"/>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        </Helmet>
        <aside className='h-[100vh]'>
          <div className="font-poppins sidebar flex flex-col relative bg-[#fff] rounded-[15px] h-[88vh] t-[1.5rem]">
            <Link className={`flex items-center relative no-underline ${isActive('/admin/dashboard') ? 'active' : ''}`} to="/admin/dashboard">
              <span className="material-symbols-outlined">
                        dashboard
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>Dashboard</h3>
            </Link>
            <Link className={`flex items-center relative no-underline ${isActive('/admin/users') ? 'active' : ''}`} to="/admin/users">
              <span className="material-symbols-outlined">
                        person_outline
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>User</h3>
            </Link>
            <Link className={`flex items-center relative no-underline ${isActive('/admin/roles') ? 'active' : ''}`} to="/admin/roles">
              <span className="material-symbols-outlined">
                    settings_accessibility
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>Roles</h3>
            </Link>
            <Link className={`flex items-center relative no-underline ${isActive('/admin/group-role') ? 'active' : ''}`} to="/admin/group-role">
              <span className="material-symbols-outlined">
                    groups
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>Group Roles</h3>
            </Link>
            <Link className={`flex items-center relative no-underline ${isActive('/admin/analytics') ? 'active' : ''}`} to="/admin/analytics">
              <span className="material-icons-sharp">
                        insights
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>Analytics</h3>
            </Link>
            <Link className="flex items-center relative no-underline" to="#">
              <span className="material-icons-sharp">
                        mail_outline
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>Tickets</h3>
              <span className="message-count">27</span>
            </Link>
            <Link className="flex items-center relative no-underline" to="#">
              <span className="material-icons-sharp">
                        report_gmailerrorred
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>Reports</h3>
            </Link>
            <Link className="flex items-center relative no-underline" to="#">
              <span className="material-symbols-outlined">
                        person_outline
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>Settings</h3>
            </Link>
            <Link className="flex items-center no-underline" to="#">
              <span className="material-icons-sharp">
                        logout
              </span>
              <h3 className='font-[500] text-[0.87rem] font-poppins'>Logout</h3>
            </Link>
          </div>
        </aside>
      </div>
    </HelmetProvider>
  );
};

export default UserSideBar;
