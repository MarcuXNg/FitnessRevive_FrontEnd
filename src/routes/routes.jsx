/* eslint-disable no-unused-vars */
import {Routes, Route} from 'react-router-dom'; // react-router-dom
import React from 'react'; // react

// Authenticated
import {useSelector} from 'react-redux';

// Router
import AdminLayout from '../components/Layout/AdminLayout.jsx'; // Admin Layout with sidebar
import UserLayout from '../components/Layout/UserLayout.jsx';
import Layout from '../components/Layout/Layout.jsx'; // Parent Fragment
import NavLayout from '../components/Layout/NavLayout.jsx';

import Home from '../page/Home/Home.jsx'; // Homepage
import About from '../page/About/About.jsx'; // About
import FAQ from '../page/FAQ/FAQ.jsx'; // FAQ
import Login from '../page/Login/Login.jsx'; // Login
import ErrorPage from '../page/error/404.jsx'; // Error

import RequireAuth from '../components/RequireAuth/RequireAuth.jsx'; // Parent Fragment with auth
import UsersEdit from '../page/User/UsersEdit.jsx'; // User edit
import PermissionsManage from '../page/Permission/PermissionsManage.jsx'; // PermissionsManage
import Admin from '../page/Admin/Admin.jsx'; // Admin

import UsersManage from '../page/Admin/UsersManage.jsx'; // UserManage
import SearchExercises from '../page/Exercise/SearchExercises.jsx';
import RolePermission from '../page/Role/RolePermission.jsx';
import AdminAnalytics from '../page/Analytics/AdminAnalytics.jsx';

import Users from '../page/User/Users.jsx'; // User Dashboard
import Calculator from '../page/Calculator/Calculator.jsx';
import Exercises from '../page/Exercise/Exercises.jsx';
import UserAnalytics from '../page/Analytics/UserAnalytics.jsx';
import Meal from '../page/Meal/meal.jsx';
import ExerciseDetail from '../page/Exercise/ExerciseDetail.jsx';


const AppRoutes = () => {
  /**
   * ['/users/show'. /users/update]
   *
   */

  // authencation
  const auth = useSelector((state) => state.auth);

  // console.log(auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<NavLayout />}>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path='calculator' element={<Calculator />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />

            {/* authenticated routes */}
            {auth && auth.account && auth.account.rolesWithPermission && (
              <Route element={<RequireAuth />}>
                {(auth.account.rolesWithPermission.id === 1 || auth.account.rolesWithPermission.id === 2) && (
                  <Route path="admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Admin />} />
                    <Route path="users" element={<UsersManage />} />
                    <Route path="permissions" element={<PermissionsManage />} />
                    <Route path="roles" element={<RolePermission />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="ticket" element={<Admin />} />
                  </Route>
                )}
                {auth.account.rolesWithPermission.id === 3 && (
                  <Route path='user' element={<UserLayout />}>
                    <Route path="dashboard" element={<Users />} />
                    <Route path="analytics" element={<UserAnalytics />} />
                    <Route path="users-edit" element={<UsersEdit />} />
                    <Route path="meal" element={<Meal />} />
                  </Route>
                )}
                <Route path="exercise" element={< Exercises/>} />
                <Route path="exercise/:id" element={<ExerciseDetail />} />
              </Route>
            )}
          </Route>


          {/* catch all */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
