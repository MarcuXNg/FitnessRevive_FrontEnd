// import
import React, {useEffect, useState} from 'react'; // react
import {Helmet, HelmetProvider} from 'react-helmet-async'; // helmet

import {toast} from 'react-toastify'; // toast notify
import {Link, useNavigate} from 'react-router-dom'; // react-router-dom
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../hooks/authSlice.js';

import {loginUser, registerNewUser} from '../../services/authService'; // auth service

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // auth import

  // navigation
  const navigate = useNavigate(); // use this instead of history.push

  // get the password and email value from login
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
        const rolesWithPermission = response.DT.rolesWithPermission;
        const email = response.DT.email;
        const username = response.DT.username;
        const token = response.DT.access_token;

        const data = {
          isAuthenticated: true,
          token,
          account: {rolesWithPermission, email, username},
        };

        // localStorage.setItem('jwt', token);
        // update context
        dispatch(login(data));

        // success
        toast.success(response.EM);

        // navigate after setting auth
        navigate('/');
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

  const defaultFocusRing = {
    isClickedSignUpEmail: true,
    isClickedSignUpPassword: true,
  };
  const [FocusRingClick, setFocusRingClick] = useState({
    defaultFocusRing,
  });

  const handleFocusRing = () => {
    setFocusRingClick(FocusRingClick);
  };

  // Sign Up Password type
  const [isPasswordSwitch, setIsPasswordSwitch] = useState(false);
  const passwordSwitch = () => {
    setIsPasswordSwitch(!isPasswordSwitch);
  };

  // Sign Up confirm Password Type
  const [isConfirmPasswordSwitch, setIsConfirmPasswordSwitch] = useState(false);
  const confirmPasswordSwitch = () => {
    setIsConfirmPasswordSwitch(!isConfirmPasswordSwitch);
  };

  // Toggle the eye icon and Sign Up password shown
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const toggleShowPassword = () => {
    setIsPasswordShow(!isPasswordShow);
    passwordSwitch();
  };

  // Toggle the eye icon and confirm password shown
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  const toggleShowConfirmPassword = () => {
    setIsConfirmPasswordShow(!isConfirmPasswordShow);
    confirmPasswordSwitch();
  };

  // isChecked = false
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // get the input value
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation default
  const defaultValidInput = {
    isValidEmail: true,
    isValidFirstName: true,
    isValidLastName: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  // regx
  const gmailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // gmail check
  const isLengthValid = password.length >= 8; // password length
  const lengthMax = password.length <= 25; // password length
  const hasUpperCase = /[A-Z]/.test(password); // uppercase
  const hasNumber = /\d/.test(password); // number
  const hasSpecialChar = /[!@#$%^&*()[\]{}\\|;:'",<.>/?`~]/.test(password); // special characters
  const hasLowerCase = /[a-z]/.test(password); // lowercase

  // Validation
  const isValidInputs = () => {
    setObjCheckInput(objCheckInput);
    // firstname check
    if (!firstname) {
      toast.error('What is your first name');
      setObjCheckInput({...defaultValidInput, isValidFirstName: false});
      return false;
    }
    // lastname check
    if (!lastname) {
      toast.error('What is your last name');
      setObjCheckInput({...defaultValidInput, isValidLastName: false});
      return false;
    }

    // email required
    if (!email) {
      toast.error(
          'Please choose a unique and valid gmail. You\'ll use this when you log in and if you ever need to reset your password.',
      );
      setObjCheckInput({...defaultValidInput, isValidEmail: false});
      return false;
    }

    // email valid
    if (!gmailCheck.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // password required
    if (!password) {
      toast.error(
          'Your password must have 8-25 characters with at least 1 capital letter, 1 number, 1 special characters, 1 lowercase letter.',
      );
      setObjCheckInput({...defaultValidInput, isValidPassword: false});
      return false;
    }

    // password length > 8
    if (!isLengthValid) {
      toast.error('Your password must have 8-25 characters');
      return false;
    }

    // password length <25
    if (!lengthMax) {
      toast.error('Your password must have 8-25 characters');
      return false;
    }

    // password contains a number
    if (!hasNumber) {
      toast.error('Your password must have a number');
      return false;
    }

    // password contains a special character
    if (!hasSpecialChar) {
      toast.error('Your password must have a special Character');
      return false;
    }

    // password contains a lowercase letter
    if (!hasLowerCase) {
      toast.error('Your password must have a LowerCase letter');
      return false;
    }

    // password contains a uppercase letter
    if (!hasUpperCase) {
      toast.error('Your password must have a UpperCase letter');
      return false;
    }
    // confirm password required
    if (!confirmPassword) {
      toast.error('Confirm Password is required');
      setObjCheckInput({...defaultValidInput, isValidConfirmPassword: false});
      return false;
    }
    // password not match
    if (password !== confirmPassword) {
      toast.error('Password not match');
      return false;
    }
    // Check agree to the terms
    if (!isChecked) {
      toast.error('You must agree to the terms');
      return false;
    }
    // else return true
    return true;
  };


  // handleRegister for button press
  const handleRegister = async () => {
    // validation
    const check = isValidInputs();
    // validation success
    if (check === true) {
      const response = await registerNewUser(
          email,
          password,
          firstname,
          lastname,
      );
      const res = await loginUser(email, password);
      if (res && +res.EC === 0) {
        // success
        const rolesWithPermission = res.DT.rolesWithPermission;
        const email = res.DT.email;
        const username = res.DT.username;
        const token = res.DT.access_token;

        const data = {
          isAuthenticated: true,
          token,
          account: {rolesWithPermission, email, username},
        };

        // update context
        dispatch(login(data));
      }
      // dấu cộng convert string sang int
      if (+response.EC === 0 && +res.EC === 0) {
        // success
        toast.success(response.EM);
        toast.success(response.EC);
        // navigate after setting auth
        navigate('/');
      } else {
        toast.error(response.EM);
      }
    }
  };

  // toggling boolean state
  const [isActive, setIsActive] = useState(false); // isActive = false (default)
  const handleButtonClick = () => {
    setIsActive(!isActive); // Toggle isActive, if isActive was true, it becomes false, and if isActive was false, it becomes true
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

  // useEffect to handle navigation after loginContext is complete
  useEffect(() => {
    if (auth && auth.isAuthenticated) {
      navigate('/'); // Navigate here after loginContext is complete
    }
  }, [auth, navigate]);

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
          <div className="sign-up absolute top-0 h-full left-[0] w-[50%] opacity-0 z-1">
            {/* form with validation*/}
            <div
              className="registrationForm bg-white flex items-center justify-center flex-col px-[40px] py-0 h-full "
              noValidate
            >
              <h1 className="text-[28px] font-bold">Create Account</h1>

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

              <span className='text-[13px]'>or use your Email for registeration</span>

              {/* First Name input */}
              <div className="flex mb-[2px]">
                <input
                  name="firstname"
                  type="name"
                  placeholder="First Name"
                  className={`w-[25rem] flex-1 border-0 bg-[#eee] my-[8px] py-[10px] px-[10px] text-[13px] rounded-[8px] outline-none placeholder-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600
        ${objCheckInput.isValidFirstName ? ' ' : 'is-invalid'}`}
                  id="Firstname"
                  required
                  value={firstname}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              {/* Last Name input */}
              <div className="flex">
                <input
                  name="lastname"
                  type="name"
                  placeholder="Last Name"
                  className={`w-[25rem] flex-1 border-0 bg-[#eee] my-[8px] py-[10px] px-[10px] text-[13px] rounded-[8px] outline-none placeholder-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600
          ${objCheckInput.isValidLastName ? ' ' : 'is-invalid'}`}
                  id="Lastname"
                  required
                  value={lastname}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>

              {/* Email input  */}
              <div className="flex focus:outline-none">
                <span
                  className="inline-flex items-center justify-center border border-r border-l-0 border-t-0 border-b-0 border-r-[#dee2e6] text-sm rounded-[8px] bg-[#eee] my-[8px] py-[9px] px-[15px] rounded-br-none rounded-tr-none outline-none"
                  id="validationForEmail"
                >
          @
                </span>
                <input
                  name="email"
                  type="email"
                  id="SignUpEmail"
                  placeholder="Email"
                  className={`w-[22rem] flex-1 border-0 bg-[#eee] my-[8px] py-[10px] px-[10px] text-[13px] rounded-[8px] rounded-tl-none rounded-bl-none outline-none placeholder-gray-500 ${FocusRingClick.isClickedSignUpEmail ? ' ' : `focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600`}
        ${objCheckInput.isValidEmail ? ' ' : 'is-invalid'}`}
                  aria-describedby="validationForEmail"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onClick={handleFocusRing}
                />
              </div>

              {/* Password input */}
              <div className="flex">
                <input
                  name="password"
                  type={`${isPasswordSwitch ? 'text' : 'password'}`}
                  id="signupPassword"
                  placeholder="New Password"
                  className={`w-[22rem] flex-1 border-0 bg-[#eee] my-[8px] py-[10px] px-[10px] text-[13px] outline-none placeholder-gray-500 rounded-[8px] rounded-br-none rounded-tr-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600
        ${objCheckInput.isValidPassword ? ' ' : 'is-invalid'}`}
                  aria-describedby="PasswordSignUp"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span
                  className="inline-flex items-center justify-center border border-r border-l-0 border-t-0 border-b-0 text-[13px] bg-[#eee] my-[8px] py-[13px] px-[15px] outline-none rounded-[8px] rounded-tl-none rounded-bl-none"
                  id="PasswordSignUp"
                >
                  <i
                    className={`fa-solid ${
              isPasswordShow ? 'fa-eye' : 'fa-eye-slash'
                    }`}
                    id="show-password"
                    onClick={toggleShowPassword}
                  ></i>
                </span>
              </div>

              {/* Confirm Password input */}
              <div className="flex">
                <input
                  type={`${isConfirmPasswordSwitch ? 'text' : 'password'}`}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className={`w-[22rem] flex-1 border-0 bg-[#eee] my-[8px] py-[10px] px-[10px] text-[13px] outline-none placeholder-gray-500 rounded-[8px] rounded-br-none rounded-tr-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600
        ${objCheckInput.isValidConfirmPassword ? ' ' : 'is-invalid'}`}
                  aria-describedby="ConfirmPasswordSignUp"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <span
                  className="inline-flex items-center justify-center border border-r border-l-0 border-t-0 border-b-0 text-[13px] bg-[#eee] my-[8px] py-[13px] px-[15px] outline-none rounded-[8px] rounded-tl-none rounded-bl-none"
                  id="ConfirmPasswordSignUp"
                >
                  <i
                    className={`fa-solid ${
              isConfirmPasswordShow ? 'fa-eye' : 'fa-eye-slash'
                    }`}
                    id="show-confirmpassword"
                    onClick={toggleShowConfirmPassword}
                  ></i>
                </span>
              </div>

              {/* Agree to the terms */}
              <div className="flex mb-3 items-center justify-center">
                <div className="flex">
                  <input
                    className="mr-2"
                    type="checkbox"
                    value=""
                    id="agreeCheck"
                    aria-describedby="invalidCheck3Feedback"
                    defaultChecked={isChecked}
                    onChange={handleCheckboxChange}
                    required
                  />
                  <div>
                    <label
                      className="text-[13px] text-[#212529]"
                      id="invalidCheck3Feedback"
                      htmlFor="agreeCheck"
                    >
              I have read and agreed to the terms
                    </label>
                  </div>
                </div>
              </div>
              {/* Submit button */}
              <button
                type="submit"
                onClick={handleRegister}
                className="bg-[#512da8] text-[12px] text-white font-semibold border-[1px] border-transparent border-solid py-[10px] px-[45px] mt-[10px] rounded-[8px] tracking-[0.5px] hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 cursor-pointer"
                id="SignUp"
              >
        SIGN UP
              </button>
            </div>
          </div>
          {/* SIGNIN */}
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
