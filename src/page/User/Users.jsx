/* eslint-disable no-unused-vars */
// User.jsx
import React, {useEffect, useState} from 'react';
import CaloriesChart from '../../components/Chart/CaloriesChart';
import useInstance from '../../setup/instance';
import {formatDistanceToNow} from 'date-fns';
import Calendar from 'react-calendar';
import {toast} from 'react-toastify';

const User = () => {
  const {instance, controller} = useInstance();
  const [goal, setGoal] = useState(0);
  const [percent, setPercent] = useState(0);
  const [eaten, setEaten] = useState(0);
  const [burned, setBurned] = useState(0);
  const [meals, setMeals] = useState([]);
  const [exercise, setExercise] = useState([]);

  const [date, setDate] = useState(new Date());
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getGoal = async () => {
    try {
      const res = await instance.get(`/users/goal/get`);
      if (res && res.data && res.data.EC === 0) {
        setGoal(res.data.DT);
        // toast.success(res.data.EM);
      } else {
        toast.error(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };
  const getDate = async (date) => {
    try {
      const res = await instance.get(`/user/dailylog/date/${date}`);
      if (res && res.data && res.data.EC === 0) {
        setEaten(res.data.DT.calories_consumed_per_day);
        setBurned(res.data.DT.calories_burnt_per_day);
        // console.log(res.data.DT);
      } else {
        toast.error(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const getMeals = async (date) => {
    try {
      const res = await instance.get(`/user/meals/date/${date}`);
      if (res && res.data && res.data.EC === 0) {
        console.log(res.data.DT);
        setMeals(res.data.DT);
        // toast.success(res.data.EM);
      } else {
        toast.error(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const getExercises = async (date) => {
    try {
      const res = await instance.get(`/user/exercises/date/${date}`);
      if (res && res.data && res.data.EC === 0) {
        // console.log(res.data.DT);
        setExercise(res.data.DT);
        // toast.success(res.data.EM);
      } else {
        toast.error(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const getRelativeTime = (targetDate) => {
    const currentDate = new Date();
    const daysDifference = Math.floor(
        (currentDate - targetDate) / (1000 * 60 * 60 * 24),
    );

    if (daysDifference === 0) {
      return 'Today';
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else if (daysDifference > 1 && daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else if (daysDifference >= 7 && daysDifference < 14) {
      return '1 week ago';
    } else if (daysDifference >= 14 && daysDifference < 21) {
      return '2 weeks ago';
    } else if (daysDifference >= 21 && daysDifference < 28) {
      return '3 weeks ago';
    } else if (daysDifference >= 28 && daysDifference < 365) {
      const monthsDifference = Math.floor(daysDifference / 30);
      return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
    } else if (daysDifference > 365 && daysDifference <= 365 * 2) {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'} ago`;
    } else {
      return formatDistanceToNow(targetDate, {addSuffix: true});
    }
  };

  const calculatePercent = async () => {
    const res = (burned / goal) * 100;
    setPercent(res.toFixed(0));
  };

  useEffect(() => {
    getGoal();
  }, []);

  useEffect(() => {
    getDate(formatDate(date));
    getMeals(formatDate(date));
    getExercises(formatDate(date));
  }, [date]);

  useEffect(() => {
    getMeals(formatDate(date));
  }, [date, eaten]);

  useEffect(() => {
    getExercises(formatDate(date));
  }, [date, burned]);

  useEffect(() => {
    calculatePercent();
  }, [burned, goal, eaten]);

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-[40px] font-montserrat font-bold mb-4'>{getRelativeTime(date)}</h1>
      <Calendar
        calendarType="iso8601"
        // minDate={new Date('2024-01-01')}
        // maxDate={new Date('2024-12-31')}
        onChange={setDate}
        value={date}
      />
      <div className='grid grid-cols-3 grid-rows-1 bg-white rounded-[18px] shadow-lg mt-10 py-8'>
        <div className='flex items-center justify-center'>
          <div>
            <h1 className='flex items-center justify-center font-poppins font-semibold'>EATEN</h1>
            <p className='flex items-center justify-center'>{eaten}</p>
          </div>
        </div>
        <div>
          <CaloriesChart percent={percent} calories={(goal - burned + eaten).toFixed(0)}/>
        </div>
        <div className='flex items-center justify-center'>
          <div>
            <h1 className='flex items-center justify-center font-poppins font-semibold'>BURNED</h1>
            <p className='flex items-center justify-center'>{burned}</p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 grid-rows-1 gap-10 mt-10 bg-white rounded-[15px] shadow-lg p-5'>
        <div>
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                Carbs
              </span>
            </div>
            <div className="ml-20 text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                50
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
        <div>
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                Protein
              </span>
            </div>
            <div className="ml-20 text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                50
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
        <div>
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                Fats
              </span>
            </div>
            <div className="ml-20 text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                50
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
      </div>
      <h1 className='mt-[60px] font-inter font-bold text-[35px]'>Log</h1>
      <div className='grid grid-cols-[35rem,35rem] grid-rows1 gap-10 mt-[40px]'>
        <div className='flex justify-center'>
          <div>
            <h1 className='flex items-center justify-center font-poppins font-semibold mb-5'>Meals</h1>
            {meals.map((meal, index) => (
              <div key={index} className='bg-white rounded-[12px] w-[350px] shadow-lg'>
                <div className="flex items-center">
                  <h3 className='font-[500] text-[1rem]'>Users</h3>
                  <h1 className='text-[1.8rem] font-[800]'>{meal.meal_name}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center'>
          <div>
            <h2 className='flex items-center justify-center font-poppins font-semibold mb-5'>Exercises</h2>
            {exercise && exercise.length > 0 && exercise.map((item, index) => (
              <div key={index} className='bg-white rounded-[12px] w-[350px] shadow-lg mb-5'>
                <div className='p-[20px] grid grid-cols-2'>
                  <div>
                    <h3 key={index} className='font-[800] text-[1.2rem]'>{item.exercise_name}</h3>
                    {item.calories !== undefined && (
                      <h1 className='text-[1rem] font-[500]'>
                        {`${item.calories}cal - ${item.duration}min`}
                      </h1>
                    )}
                  </div>
                  <div className='flex items-center justify-end'>
                    <span className="material-symbols-outlined mr-2">
                      edit
                    </span>
                    <span className="material-symbols-outlined bg-slate-300 rounded-full">
                      close_small
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
