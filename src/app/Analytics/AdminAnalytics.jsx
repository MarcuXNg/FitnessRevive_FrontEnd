/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import {HelmetProvider, Helmet} from 'react-helmet-async';
import CircleProgressBar from '../../components/ProgressBar/CircleProgressBar';
import {countAllUserPerWeek, countAllUser} from '../../services/userService';

const AdminAnalytics = () => {
  // auth
  const {auth} = useAuth();

  // count user
  const [userCount, setUserCount] = useState(0);
  const countUser = async () => {
    try {
      if (auth.isAuthenticated) {
        const data = await countAllUser();
        const count = data.DT;
        setUserCount(count);
      }
    } catch (error) {
      console.log(error);
    };
  };

  // progress state for circle Progressbar
  const [progress, setProgress] = useState(0);

  // user analysis perweek
  const getUsersCount = async () => {
    try {
      if (auth.isAuthenticated) {
        const res = await countAllUserPerWeek();
        // console.log(res);
        return res.DT;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProcess = async () => {
    try {
      // Simulate progress change over time (replace with your logic)
      const percent = await getUsersCount(); // Call it once immediately
      const percentNumber = parseFloat(percent) || 0; // Convert to number, default to 0 if undefined or empty string
      if (percentNumber > 0) {
        const interval = setInterval(() => {
          setProgress((prevProgress) => (prevProgress < percentNumber ? prevProgress + 1 : percentNumber));
        }, 20); // Increase the interval for slower progress

        return () => clearInterval(interval);
      } else if (percentNumber < 0) {
        setProgress(0);
      } else {
        setProgress(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect for countUser function
  useEffect(() => {
    countUser();
  }, []);

  // useEffect for progress bar (runs once on mount)
  useEffect(() => {
    updateUserProcess();
  }, []);

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet"/>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet" />
          <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        </Helmet>
        <h1 className='font-poppins text-[30px] font-medium'>Analytics</h1>
        {/* <!-- Analyses --> */}
        <div className="analyse grid grid-cols-3 gap-[1.6rem]">
          <div className="overall">
            <div className="flex status items-center justify-between">
              <div className="info">
                <h3 className='font-[500] text-[1rem]'>Users</h3>
                <h1 className='text-[1.8rem] font-[800]'>{userCount}</h1>
              </div>
              <div className="progress">
                <CircleProgressBar percent={progress} color='text-[#1B9C85]'/>
              </div>
            </div>
          </div>
          <div className="visits">
            <div className="status flex items-center justify-between">
              <div className="info">
                <h3 className='font-[500] text-[1rem]'>Site Visit</h3>
                <h1 className='text-[1.8rem] font-[800]'>1,000</h1>
              </div>
              <div className="progress">
                <CircleProgressBar percent={progress} color='text-[#FF0060]'/>
              </div>
            </div>
          </div>
          <div className="searches">
            <div className="status flex items-center justify-between">
              <div className="info">
                <h3 className='font-[500] text-[1rem]'>Searches</h3>
                <h1 className='text-[1.8rem] font-[800]'>14,000</h1>
              </div>
              <div className="progress">
                <CircleProgressBar percent={progress} color='text-[#F7D060]'/>
              </div>
            </div>
          </div>
        </div>
        {/* <!--  End of Analyses--> */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
            Task in Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                {/* {`${percent}%`} */}
              </span>
            </div>
          </div>
          <div className="flex mb-2 items-center justify-start">
            <div className="w-full overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
              <div
                // style={{width: `${percent}%`}}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
              ></div>
            </div>
          </div>
        </div>

        {/* <!-- New Users Section --> */}
        <div className="new-users">
          <h2 className='font-poppins text-[20px] font-normal'>New Users</h2>
          <div className="user-list flex justify-around flex-wrap">
            <div className="user flex flex-col items-center justify-center">
              <img src={process.env.PUBLIC_URL + '/user/male.png'}/>
              <h2 className='font-poppins text-[20px] font-medium'>Jack</h2>
              <p className='font-poppins'>Joined at 11/11/2023</p>
            </div>
            <div className="user flex flex-col items-center justify-center">
              <img src={process.env.PUBLIC_URL + '/user/male.png'}/>
              <h2 className='font-poppins text-[20px] font-medium'>Jack</h2>
              <p className='font-poppins'>Joined at 11/11/2023</p>
            </div>
            <div className="user flex flex-col items-center justify-center">
              <img src={process.env.PUBLIC_URL + '/user/male.png'}/>
              <h2 className='font-poppins text-[20px] font-medium'>Jack</h2>
              <p className='font-poppins'>Joined at 11/11/2023</p>
            </div>
            <div className="user flex flex-col items-center justify-center">
              <a className="border-2 border-[#3a333399] flex items-center relative no-underline" href="/admin/users">
                <span className="material-symbols-outlined pl-[3px]">
                  person_add
                </span>
              </a>
              <h2 className='font-poppins text-[20px] font-medium'>More</h2>
              <p className='font-poppins'>New User</p>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AdminAnalytics;
