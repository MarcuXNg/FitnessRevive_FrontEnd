/* eslint-disable no-unused-vars */
import {Routes, Route} from 'react-router-dom'; // react-router-dom
import React from 'react'; // react

// Authenticated
import {useAuth} from '../hooks/useAuth.jsx';

// Router
import Home from '../app/Home/Home.jsx'; // Homepage
import About from '../app/About/About.jsx'; // About
import FAQ from '../app/FAQ/FAQ.jsx'; // FAQ
import Login from '../app/Login/Login.jsx'; // Login
import ErrorPage from '../app/404/404.jsx'; // Error
import Users from '../app/User/Users.jsx'; // User Dashboard
import Layout from '../components/Layout/Layout.jsx'; // Parent Fragment
import RequireAuth from '../components/RequireAuth/RequireAuth.jsx'; // Parent Fragment with auth
import UsersEdit from '../app/User/UsersEdit.jsx'; // User edit
import RolesManage from '../app/Roles/RolesManage.jsx'; // RolesManage
import Admin from '../app/Admin/Admin.jsx'; // Admin
import AdminLayout from '../components/Layout/AdminLayout.jsx'; // Admin Layout with sidebar
import UsersManage from '../app/Admin/UsersManage.jsx'; // UserManage
import SearchExercises from '../app/Exercise/SearchExercises.jsx';
import GroupRole from '../app/GroupRole/GroupRole.jsx';
import AdminAnalytics from '../app/Analytics/AdminAnalytics.jsx';

const AppRoutes = () => {
  /**
   * ['/users/show'. /users/update]
   *
   *
   */

  // authencation
  const {auth} = useAuth();
  // console.log(auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="exercises" element={<SearchExercises />} />

          {/* authenticated routes */}
          {auth && auth.account && auth.account.rolesWithPermission && (
            <Route element={<RequireAuth />}>
              {(auth.account.rolesWithPermission.id === 1 || auth.account.rolesWithPermission.id === 2) && (
                <Route path="admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Admin />} />
                  <Route path="users" element={<UsersManage />} />
                  <Route path="roles" element={<RolesManage />} />
                  <Route path="group-role" element={<GroupRole />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="ticket" element={<Admin />} />
                </Route>
              )}
              {auth.account.rolesWithPermission.id === 3 && (
                <Route path="users" element={<Users />}>
                  <Route path="users/edit" element={<UsersEdit />} />
                </Route>
              )}
            </Route>
          )}

          {/* catch all */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
