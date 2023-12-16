import {Routes, Route} from 'react-router-dom'; // react-router-dom
import React from 'react'; // react

// Authenticated
// import {useAuth} from '../hooks/useAuth.jsx';

// Router
import Home from '../app/Home/Home.jsx';
import About from '../app/About/About.jsx';
import FAQ from '../app/FAQ/FAQ.jsx';
import Login from '../app/Login/Login.jsx';
import ErrorPage from '../app/404/404.jsx';
import Users from '../app/User/Users.jsx';
import Layout from '../components/Layout/Layout.jsx';
import RequireAuth from '../components/RequireAuth/RequireAuth.jsx';
import UsersEdit from '../app/User/UsersEdit.jsx';
import RolesManage from '../app/Roles/RolesManage.jsx';
import Admin from '../app/Admin/Admin.jsx';
import AdminLayout from '../components/Layout/AdminLayout.jsx';
import UsersManage from '../app/Admin/UsersManage.jsx';

const AppRoutes = () => {
  /**
   * ['/users/show'. /users/update]
   *
   *
   */

  // authencation
  // const {auth} = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="FAQ" element={<FAQ />} />

          {/* {auth && auth.account.groupWithRoles.id === '1' || auth && auth.account.groupWithRoles.id === '3'} */}
          {/* authenticated routes */}
          <Route element={<RequireAuth />}>
            <Route path="users" element={<Users />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route path="admin" element={<Admin />} />
              <Route path="users" element={<UsersManage />} />
              <Route path='roles' element={<RolesManage />}/>
              <Route path="analytics" element={<Admin />} />
              <Route path="ticket" element={<Admin />} />
            </Route>
            <Route path='users/edit' element={<UsersEdit/>}/>
          </Route>

          {/* catch all */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
