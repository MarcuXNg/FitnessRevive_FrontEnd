/* eslint-disable no-unused-vars */
// Login.jsx
import React, {useContext, useEffect, useState} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';

import '../../styles/index/index.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Login = (props) => {
  // toggling boolean state
  // isActive = false
  const [isActive, setIsActive] = useState(false);
  const handleButtonClick = () => {
    // Toggle isActive, if isActive was true, it becomes false, and if isActive was false, it becomes true
    setIsActive(!isActive);
  };

  useEffect(() => {
    document.title = 'Login';
    const container = document.getElementById('container');
    if (container) {
      // If isActive = true, add the class 'active' to the container element, making it visually active.
      if (isActive) {
        container.classList.add('active');
      } else {
        // If isActive = false, remove the class 'active' to the container element, making it visually inactive.
        container.classList.remove('active');
      }
    }
  }, [isActive]);

  return (
    <HelmetProvider>
      <div className="loginRegister-body items-center justify-center flex-col flex">
        <div className={`login-container`} id="container">
          <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          {/* SIGNUP */}
          <RegisterForm/>
          {/* SIGNIN */}
          <LoginForm/>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1 className="text-[1.75rem] font-bold mb-1">Welcome Back!</h1>
                <p className='text-[14px] tracking-[0.3px] leading-[20px] my-[20px]'>Enter your personal details to use all of site features</p>
                <button
                  className="bg-transparent border-[#fff] text-white text-[12px] font-semibold uppercase border-[1px] border-solid rounded-[8px] tracking-[0.5px] mt-[10px] py-[10px] px-[45px] cursor-pointer hover:bg-[#512da8]"
                  id="login"
                  onClick={handleButtonClick}
                >
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1 className="text-[1.75rem] font-bold mb-1">Hello, Friend!</h1>
                <p className='text-[14px] tracking-[0.3px] leading-[20px] my-[20px]'>
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  className="bg-transparent border-[#fff] text-white text-[12px] font-semibold uppercase border-[1px] border-solid rounded-[8px] tracking-[0.5px] mt-[10px] py-[10px] px-[45px] cursor-pointer hover:bg-[#512da8]"
                  id="register"
                  onClick={handleButtonClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Login;
