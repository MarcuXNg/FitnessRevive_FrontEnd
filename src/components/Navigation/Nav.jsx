/* eslint-disable prefer-const */
// React
import React, {useState, useEffect} from 'react';
// Scss
import '../../styles/index/index.scss';
// React router dom
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
// Helmet
import {HelmetProvider, Helmet} from 'react-helmet-async';

// Authenticated
import {useAuth} from '../../hooks/useAuth.jsx';

// toast
import {toast} from 'react-toastify';

// logout service
import {logoutUser} from '../../services/userService';

// Mui material
import {Stack, Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';

const NavHeader = (props) => {
  // authencation
  const {auth, logoutContext} = useAuth();
  // get the location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();
  const bmi = () => {
    navigate('/bmi');
  };
  const login = () => {
    navigate('/login');
  };
  const users = () => {
    navigate('/users');
  };

  // handle logout
  const handleLogout = async () => {
    let data = await logoutUser(); // clear cookies
    localStorage.removeItem('jwt'); // clear localStorage
    logoutContext(); // clear user in context

    if (data && +data.EC === 0) {
      toast.success('logout successfully');
      navigate('/login');
    } else {
      toast.error(data.EM);
    }
  };

  // darkmode lightmode
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  // Features state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // User state
  const [userProfileAnchorEl, setUserProfileAnchorEl] = useState(null);
  const userProfileOpen = Boolean(userProfileAnchorEl);

  const userProfileClick = (event) => {
    setUserProfileAnchorEl(event.currentTarget);
  };
  const userProfileClose = () => {
    setUserProfileAnchorEl(null);
  };

  // render the state of the popover dropdown every time reload the page and set it to null
  useEffect(() => {
    setAnchorEl(null); // features dropdwon
    setUserProfileAnchorEl(null); // profile dropdown
  }, [location.pathname]);

  // path that show navigation headers
  const validPaths = [
    '/',
    '/about',
    '/FAQ',
    '/users',
    '/users/edit',
    '/admin',
    '/admin/roles',
    '/admin/users',
  ];

  if (validPaths.includes(location.pathname)) {
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
              rel="stylesheet"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
            />
          </Helmet>
          <nav className="flex items-center shadow-sm shadow-[#0000005e] fixed top-0 w-[1920px] h-[80px] bg-[#F5F5F5] dark:bg-slate-800 z-[9999]">
            <div className="nav-header w-[1774px] mx-auto justify-center">
              <Stack
                direction="row"
                spacing={12}
                className="items-center my-[7px]"
              >
                <div>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    className="font-poppins whitespace-nowrap"
                  >
                    <NavLink
                      to="/"
                      className="font-poppins font-bold flex items-center"
                    >
                      <img
                        src={process.env.PUBLIC_URL + '/logo/logo.png'}
                        className="w-[48px]"
                        alt="Logo"
                      />
                      <span className="ml-2">Fitness Revive</span>
                    </NavLink>
                  </Stack>
                </div>
                <div className="container">
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* Home */}
                    <NavLink
                      to="/"
                      className="nav-a font-poppins hover:mb-[0.6rem]"
                    >
                      Home
                    </NavLink>
                    {/* About */}
                    <NavLink
                      to="/about"
                      className="nav-a font-poppins hover:mb-[0.6rem]"
                    >
                      About
                    </NavLink>
                    {/* FAQ */}
                    <NavLink
                      to="/FAQ"
                      className="nav-a font-poppins hover:mb-[0.6rem]"
                    >
                      FAQ
                    </NavLink>
                    {/* Features */}
                    <div>
                      <Typography
                        className="nav-a hover:mb-[0.6rem]"
                        sx={{
                          color: 'black',
                          fontFamily: 'Poppins, sans-serif',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: '400',
                          cursor: 'pointer',
                        }} // css
                        aria-controls={open ? 'features-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        Features
                      </Typography>
                      <Menu
                        id="features-menu"
                        sx={{
                          top: '8px',
                          zIndex: '9999',
                        }}
                        open={open}
                        onClose={handleClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <MenuItem
                          onClick={bmi}
                          style={{
                            // Use inline styles
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        >
                          BMI / BMR
                        </MenuItem>
                        <MenuItem
                          style={{
                            // Use inline styles
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        >
                          Calories
                        </MenuItem>
                        <MenuItem
                          style={{
                            // Use inline styles
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        >
                          Exercises
                        </MenuItem>
                      </Menu>
                    </div>
                    <NavLink
                      to="/dashboard"
                      className="nav-a font-poppins hover:mb-[0.6rem]"
                    >
                      Dashboard
                    </NavLink>
                  </Stack>
                </div>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  className="items-center justify-center"
                  spacing={3}
                >
                  <div
                    id="dark-mode"
                    className="flex justify-between items-center cursor-pointer h-[1.6rem] w-[3rem] rounded-[0.4rem]"
                  >
                    <span
                      className={`material-icons-sharp flex items-center justify-center ${
                        activeIndex === 0 ? 'active' : ''
                      }`}
                      onClick={() => toggleActive(0)}
                    >
                      light_mode
                    </span>
                    <span
                      className={`material-icons-sharp flex items-center justify-center ${
                        activeIndex === 1 ? 'active' : ''
                      }`}
                      onClick={() => toggleActive(1)}
                    >
                      dark_mode
                    </span>
                  </div>
                  <div>
                    {auth && auth.isAuthenticated ? (
                      // If user is authenticated, render Logout button
                      <div>
                        <div className="group flex items-center">
                          <div className="mr-3">
                            <p className="text-sm font-medium text-black cursor-default whitespace-nowrap">
                              Welcome, Kien
                            </p>
                          </div>
                          <img
                            src={process.env.PUBLIC_URL + '/test/test.jpg'}
                            className="shrink-0 h-11 w-11 rounded-full cursor-pointer"
                            onClick={userProfileClick}
                            aria-controls={open ? 'user-menu' : undefined}
                          />
                        </div>
                        <Menu
                          id="user-menu"
                          sx={{
                            top: '8px',
                            zIndex: '9999',
                          }}
                          open={userProfileOpen}
                          onClose={userProfileClose}
                          anchorEl={userProfileAnchorEl}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          <MenuItem
                            onClick={users}
                            style={{
                              // Use inline styles
                              // fontWeight: 400,
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            style={{
                              // Use inline styles
                              // fontWeight: 400,
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            Change Password
                          </MenuItem>
                          <Divider dark />
                          <MenuItem
                            style={{
                              // Use inline styles
                              // fontWeight: 400,
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            <span onClick={handleLogout}>Log out</span>
                          </MenuItem>
                        </Menu>
                      </div>
                    ) : (
                      // If user is not authenticated, render Login button
                      <Button
                        sx={{
                          'color': '#2F2F2F',
                          'fontFamily': 'Poppins, sans-serif',
                          'fontSize': '13px',
                          'fontWeight': '500',
                          'borderRadius': '8px',
                          'paddingLeft': '30px',
                          'paddingRight': '30px',
                          'paddingTop': '10px',
                          'paddingBottom': '10px',
                          'bgcolor': '#DCDCDC',
                          '&:hover': {
                            bgcolor: '#A1F65E', // Change this to the desired hover background color
                          },
                        }}
                        variant="contained"
                        onClick={login}
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </Stack>
              </Stack>
            </div>
          </nav>
        </HelmetProvider>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
