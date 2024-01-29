/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {HelmetProvider, Helmet} from 'react-helmet-async';
import CircleProgressBar from '../../components/ProgressBar/CircleProgressBar';
import useInstance from '../../setup/instance';

const AdminAnalytics = () => {
  // auth

  const auth = useSelector((state) => state.auth);

  const {instance, controller} = useInstance();

  // count user api call
  const [userCount, setUserCount] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const countAllUser = async () => {
    try {
      return await instance.get(`/users/count`);
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const countAllUserPerWeek = async () => {
    try {
      return await instance.get(`/users/count-per-week`);
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const getAllUser = async () => {
    try {
      return await instance.get(`/users`);
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };
  const countUser = async () => {
    try {
      if (auth.isAuthenticated) {
        const res = await countAllUser();
        const count = res.data.DT;
        setUserCount(count);
      }
    } catch (error) {
      console.log(error);
    };
  };

  const getUser = async () => {
    try {
      if (auth.isAuthenticated) {
        const res = await getAllUser();
        const userData = res.data.DT;
        setUsersData(userData);
        console.log(res);
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
        return res.data.DT;
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

  const formatDate = (dateTimeString) => {
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    const locale = 'en-GB'; // Set the locale to a region where "DD/MM/YYYY" is standard
    return new Date(dateTimeString).toLocaleDateString(locale, options);
  };

  // useEffect (runs once on mount)
  useEffect(() => {
    getUser();
    countUser();
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
        <h2 className='font-poppins text-[20px] font-normal'>Overall</h2>
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
                <CircleProgressBar percent={50} color='text-[#FF0060]'/>
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
                <CircleProgressBar percent={70} color='text-[#F7D060]'/>
              </div>
            </div>
          </div>
        </div>
        {/* <!--  End of Analyses--> */}

        {/* <!-- New Users Section --> */}
        <div className="new-users">
          <h2 className='font-poppins text-[20px] font-normal'>New Users</h2>
          <div className="user-list flex justify-around flex-wrap">
            {usersData.map((user, index) => (
              <div key={index} className="user flex flex-col items-center justify-center">
                <img src={process.env.PUBLIC_URL + '/user/male.png'} alt={`user-${index}`} />
                <h2 className='font-poppins text-[20px] font-medium'>{user.first_name}</h2>
                <p className='font-poppins'>Joined at {formatDate(user.User.createdAt)}</p>
              </div>
            ))}
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
