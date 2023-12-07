import React, {useState} from 'react';
import '../../styles/index/index.scss';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {HelmetProvider, Helmet} from 'react-helmet-async';

import {useAuth} from '../../hooks/useAuth.jsx';

import {Stack, Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

const NavHeader = (props) => {
  const {auth} = useAuth();
  const location = useLocation();

  // navigation
  const navigate = useNavigate();
  const bmi = () => {
    navigate('/bmi');
  };
  const login = () => {
    navigate('/login');
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (
    location.pathname === '/' ||
    location.pathname === '/about' ||
    location.pathname === '/FAQ'
  ) {
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
          <nav className="flex items-center shadow-lg shadow-[#512da8] fixed top-0 w-[1920px] bg-white dark:bg-slate-800">
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
                    <NavLink to="/" className="font-poppins hover:mb-[0.6rem]">
                      Home
                    </NavLink>
                    {/* About */}
                    <NavLink
                      to="/about"
                      className="font-poppins hover:mb-[0.6rem]"
                    >
                      About
                    </NavLink>
                    {/* FAQ */}
                    <NavLink
                      to="/FAQ"
                      className="font-poppins hover:mb-[0.6rem]"
                    >
                      FAQ
                    </NavLink>
                    {/* Features */}
                    <div>
                      <Typography
                        className="hover:mb-[0.6rem]"
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
                        <MenuItem onClick={bmi} className="font-poppins">
                          BMI / BMR
                        </MenuItem>
                        <MenuItem className="font-poppins">Calories</MenuItem>
                        <MenuItem className="font-poppins">Exercises</MenuItem>
                      </Menu>
                    </div>
                    <NavLink
                      to="/dashboard"
                      className="font-poppins hover:mb-[0.6rem]"
                    >
                      Dashboard
                    </NavLink>
                  </Stack>
                </div>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  className="items-center justify-center"
                  spacing={2}
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
                      <Button
                        sx={{
                          color: 'white',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '13px',
                          fontWeight: '500',
                          borderRadius: '8px',
                          paddingLeft: '30px',
                          paddingRight: '30px',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                          bgcolor: '#512da8',
                        }}
                        variant="contained"
                        // onClick={logout} // Assuming you have a logout function in your useAuth hook
                      >
                        Logout
                      </Button>
                    ) : (
                      // If user is not authenticated, render Login button
                      <Button
                        sx={{
                          color: 'white',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '13px',
                          fontWeight: '500',
                          borderRadius: '8px',
                          paddingLeft: '30px',
                          paddingRight: '30px',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                          bgcolor: '#512da8',
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
