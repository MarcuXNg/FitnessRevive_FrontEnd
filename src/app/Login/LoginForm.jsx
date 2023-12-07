// import
import React, {useState} from 'react'; // react
import {Link, useNavigate} from 'react-router-dom'; // react-router-dom
import {useAuth} from '../../hooks/useAuth'; // Authen
import {loginUser} from '../../services/userService'; // login service

// toast notify
import {toast} from 'react-toastify';

// import scss
import '../../styles/index/index.scss';


const LoginForm = () => {
  const {loginContext} = useAuth();

  // navigation
  const navigate = useNavigate();
  // get the password and email from login
  const [ValueLogin, setValueLogin] = useState('');
  const [PasswordLogin, setPasswordLogin] = useState('');

  const defaultLoginValidInput = {
    isValidValueLogin: true,
    isValidValuePassword: true,
  };
  const [loginValidInput, setLoginValidInput] = useState(
      defaultLoginValidInput,
  );

  // Sign In Password type
  const [isSignInPasswordSwitch, setIsSignInPasswordSwitch] = useState(false);
  const signInPasswordSwitch = () => {
    setIsSignInPasswordSwitch(!isSignInPasswordSwitch);
  };

  // Toggle the eye icon and Sign Up password shown
  const [isSignInPasswordShow, setIsSignInPasswordShow] = useState(false);
  const toggleSignInShowPassword = () => {
    setIsSignInPasswordShow(!isSignInPasswordShow);
    signInPasswordSwitch();
  };
    // handleLogin for button press
  const handleLogin = async () => {
    setLoginValidInput(defaultLoginValidInput);
    if (!ValueLogin) {
      setLoginValidInput({
        ...defaultLoginValidInput,
        isValidValueLogin: false,
      });
      toast.error('Please enter your email address');
      return;
    }
    if (!PasswordLogin) {
      setLoginValidInput({
        ...defaultLoginValidInput,
        isValidValuePassword: false,
      });
      toast.error('Please enter your password');
      return;
    }
    try {
      const response = await loginUser(ValueLogin, PasswordLogin);
      if (response && +response.EC === 0) {
        // success
        const groupWithRoles = response.EC.groupWithRoles;
        const email = response.EC.email;
        const username = response.EC.username;
        const token = response.DT.access_token;

        const data = {
          isAuthenticated: true,
          token,
          account: {groupWithRoles, email, username},
        };

        localStorage.setItem('jwt', token);
        loginContext(data);
        // succes
        toast.success(response.EM);
        // navigate
        return navigate('/users');
        // handleCreateNewAccount();
      }
      if (response && +response.EC !== 0) {
        // error
        toast.error(response.EM);
      }
    } catch (error) {
      // Handle login error here
      toast.error('Login failed. Please check your credentials.');
      console.log(error);
    }
  };

  // Event when ever user press enter on password it will submit and post to the api
  const handlePressEnter = (event) => {
    if (event.keyCode === 13 && event.code === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="sign-in absolute top-0 h-full left-[0] w-[50%] z-2">
      <div
        className="signInForm bg-white flex items-center justify-center flex-col px-[40px] py-0 h-full"
        noValidate
      >
        <h1 className="text-[28px] font-bold">Sign In</h1>

        <div className="social-icons my-[20px]">
          <a
            href="/"
            className="icon justify-center items-center inline-flex border-solid border-[#ccc] border-[1px] rounded-[20%] mx-[3px] w-[40px] h-[40px] text-black text-[14px] font-[500] m-t-[15px] m-b-[10px] hover:text-[#512da8] hover:font-[600]"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="/"
            className="icon justify-center items-center inline-flex border-solid border-[#ccc] border-[1px] rounded-[20%] mx-[3px] w-[40px] h-[40px] text-black text-[14px] font-[500] m-t-[15px] m-b-[10px] hover:text-[#512da8] hover:font-[600]"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="/"
            className="icon justify-center items-center inline-flex border-solid border-[#ccc] border-[1px] rounded-[20%] mx-[3px] w-[40px] h-[40px] text-black text-[14px] font-[500] m-t-[15px] m-b-[10px] hover:text-[#512da8] hover:font-[600]"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="/"
            className="icon justify-center items-center inline-flex border-solid border-[#ccc] border-[1px] rounded-[20%] mx-[3px] w-[40px] h-[40px] text-black text-[14px] font-[500] m-t-[15px] m-b-[10px] hover:text-[#512da8] hover:font-[600]"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>

        <span className='text-[13px]'>or</span>

        <div className="flex mb-[2px]">
          <span
            className="inline-flex items-center justify-center border border-r border-l-0 border-t-0 border-b-0 border-r-[#dee2e6] text-sm rounded-[8px] bg-[#eee] my-[8px] py-[9px] px-[15px] rounded-br-none rounded-tr-none outline-none"
            id="UserIcon"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          {/* <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        </span> */}
          <input
            name="email"
            type="email"
            id="loginName"
            placeholder="Email"
            className={`w-[22rem] flex-1 border-0 bg-[#eee] my-[8px] py-[10px] px-[10px] text-[13px] rounded-[8px] rounded-tl-none rounded-bl-none outline-none placeholder-gray-500
        ${loginValidInput.isValidValueLogin ? ' ' : 'is-invalid'}`}
            aria-describedby="SignInEmailIcon"
            required
            value={ValueLogin}
            onChange={(event) => setValueLogin(event.target.value)} // get the email value
          />
        </div>

        <div className="flex">
          <input
            name="password"
            type={`${isSignInPasswordSwitch ? 'text' : 'password'}`}
            id="loginPassword"
            placeholder="Password"
            className={`w-[22rem] flex-1 border-0 bg-[#eee] my-[8px] py-[10px] px-[10px] text-[13px] outline-none placeholder-gray-500 rounded-[8px] rounded-br-none rounded-tr-none
          ${loginValidInput.isValidValuePassword ? ' ' : 'is-invalid'}`}
            value={PasswordLogin}
            onChange={(event) => setPasswordLogin(event.target.value)} // get the password value
            onKeyDown={(event) => handlePressEnter(event)} // Enter will login
            aria-describedby="PasswordSignIn"
            required
          />
          <div className="flex">
            <span
              className="inline-flex items-center justify-center border border-r border-l-0 border-t-0 border-b-0 text-[13px] bg-[#eee] my-[8px] py-[13px] px-[15px] outline-none rounded-[8px] rounded-tl-none rounded-bl-none"
              id="PasswordSignIn"
            >
              <i
                className={`fa-solid ${
                isSignInPasswordShow ? 'fa-eye' : 'fa-eye-slash'
                }`}
                id="show-SignInPassword"
                onClick={toggleSignInShowPassword}
              ></i>
            </span>
          </div>
        </div>

        {/* Remember me Checkbox */}
        <div className="flex items-center mb-[1px]">
          <input
            className="mr-2"
            type="checkbox"
            value=""
            id="loginCheck"
            defaultChecked={false}
          />
          <label className="text-[13px] text-[#212529]" htmlFor="loginCheck">
          Remember me
          </label>
        </div>
        <div className='mb-[3px]'>
          {/* Forget your password */}
          <Link to="/" className="no-underline text-black text-[14px] font-[500] mt-[15px] mb-[10px] hover:text-[#512da8] hover:font-semibold">
          Forget Your Password?
          </Link>
        </div>

        <button
          type="submit"
          className="bg-[#512da8] text-[12px] text-white font-semibold border-[1px] border-transparent border-solid py-[10px] px-[45px] mt-[10px] rounded-[8px] tracking-[0.5px] hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 cursor-pointer"
          id="SignIn"
          onClick={handleLogin}
        >
        SIGN IN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
