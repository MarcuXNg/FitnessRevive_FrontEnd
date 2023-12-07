import {Routes, Route} from 'react-router-dom';
import React from 'react';

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

const AppRoutes = (props) => {
  /**
   * ['/users/show'. /users/update]
   *
   *
   */

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="FAQ" element={<FAQ />} />

          {/* authenticated routes */}
          <Route element={<RequireAuth />}>
            <Route path="users" element={<Users />} />
            <Route path="admin" element={<Users />} />
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
