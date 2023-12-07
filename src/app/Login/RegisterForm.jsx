// import
import React, {useState} from 'react'; // react
import {registerNewUSer} from '../../services/userService'; // register service
import {useNavigate} from 'react-router-dom'; // react-router-dom

// toast notify
import {toast} from 'react-toastify';

// import scss
import '../../styles/index/index.scss';

const RegisterForm = () => {
  // navigation
  const navigate = useNavigate();

  const handleCreateNewAccount = () => {
    navigate('/users');
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
      const response = await registerNewUSer(
          email,
          password,
          firstname,
          lastname,
      );
      const serverData = response;
      // console.log(serverData);
      // dấu cộng convert string sang int
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        handleCreateNewAccount();
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  return (
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
  );
};

export default RegisterForm;
