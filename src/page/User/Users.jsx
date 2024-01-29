/* eslint-disable no-unused-vars */
// User.jsx
import React, {useEffect, useState} from 'react';
import CaloriesChart from '../../components/Chart/CaloriesChart';
import useInstance from '../../setup/instance';
import {formatDistanceToNow} from 'date-fns';
import Calendar from 'react-calendar';
// import {toast} from 'react-toastify';

const User = () => {
  const {instance, controller} = useInstance();
  const [goal, setGoal] = useState(0);
  const [percent, setPercent] = useState(0);
  const [eaten, setEaten] = useState(0);
  const [burned, setBurned] = useState(0);
  const [meals, setMeals] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [carb, setCarb] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [weight, setWeight] = useState(0);
  const [waterGoal, setWaterGoal] = useState(0);
  const [water, setWater] = useState(0);
  const carbGoal = (((0.55 * (Number(goal))) / 4).toFixed(0));
  const proteinGoal = (((0.225 * (Number(goal))) / 4).toFixed(0));
  const fatGoal = (((0.275 * (Number(goal))) / 9).toFixed(0));


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
        setGoal(res.data.DT.calories_goal);
        setWeight(res.data.DT.weight);
        setWaterGoal(res.data.DT.water_intake);
        // toast.success(res.data.EM);
      } else {
        // toast.error(res.data.EM);
        console.log(res.data.EM);
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
        setFat(res.data.DT.fat_consumed_per_day);
        setCarb(res.data.DT.carbs_consumed_per_day);
        setProtein(res.data.DT.protein_consumed_per_day);
        setWater(res.data.DT.water_drink_per_day);
        // console.log(res.data.DT);
      } else {
        // toast.error(res.data.EM);
        console.log(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  // Calculate the number of glasses needed
  const glassesNeeded = ((Number(waterGoal) * 1000) / 240).toFixed(0);

  // Calculate the number of glasses the user has already drunk
  const glassesDrunk = Number(water);

  // Create an array of indices based on the glasses needed
  const indices = Array.from({length: glassesNeeded}, (_, index) => index);

  const saveWater = async () => {
    try {
      await instance.post(`/user/water/drink/${formatDate(date)}`);
      await getDate(formatDate(date));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWater = async () => {
    try {
      await instance.delete(`/user/water/delete/${formatDate(date)}`);
      await getDate(formatDate(date));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (index) => {
    if (index < (glassesDrunk / 240)) {
      // The clicked span represents water that has been consumed
      deleteWater();
    } else {
      // The clicked span represents water that is part of the goal
      saveWater();
    }
  };


  const getMeals = async (date) => {
    try {
      const res = await instance.get(`/user/meals/date/${date}`);
      if (res && res.data && res.data.EC === 0) {
        // console.log(res.data.DT);
        setMeals(res.data.DT);
        // toast.success(res.data.EM);
      } else {
        // toast.error(res.data.EM);
        console.log(res.data.EM);
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
        // toast.error(res.data.EM);
        console.log(res.data.EM);
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
    const res = (eaten / goal) * 100;
    if (res.toFixed(0) > 100) {
      setPercent(100);
    }
    setPercent(res.toFixed(0));
  };

  useEffect(() => {
    getGoal();
  }, []);

  useEffect(() => {
    getGoal();
    getDate(formatDate(date));
    getMeals(formatDate(date));
    getExercises(formatDate(date));
  }, [date]);

  useEffect(() => {
    calculatePercent();
  }, [date, goal, eaten]);

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
        <div></div>
        <div>
          <h1 className='flex items-center justify-center font-poppins font-semibold'>Calories</h1>
        </div>
        <div></div>
        <div className='flex items-center justify-center'>
          <div>
            <h1 className='flex items-center justify-center font-poppins font-semibold'>EATEN</h1>
            <p className='flex items-center justify-center'>{Number(eaten)}</p>
          </div>
        </div>
        <div>
          <CaloriesChart percent={Number(percent)} calories={Number((goal + burned - eaten).toFixed(0))}/>
        </div>
        <div className='flex items-center justify-center'>
          <div>
            <h1 className='flex items-center justify-center font-poppins font-semibold'>BURNED</h1>
            <p className='flex items-center justify-center'>{Number(burned)}</p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 grid-rows-1 gap-10 mt-10 bg-white rounded-[15px] shadow-lg p-5'>
        <div>
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                Carb
              </span>
            </div>
            <div className="ml-20 text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                {carb} / {carbGoal}
              </span>
            </div>
          </div>
          <div className="flex mb-2 items-center justify-start">
            <div className="w-full overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
              <div
                style={{width: `${(Number(carb) / carbGoal) * 100}%`}}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500`}
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
                {protein} / {proteinGoal}
              </span>
            </div>
          </div>
          <div className="flex mb-2 items-center justify-start">
            <div className="w-full overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
              <div
                style={{width: `${(Number(protein) / proteinGoal) * 100}%`}}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500`}
              ></div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                Fat
              </span>
            </div>
            <div className="ml-20 text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                {fat} / {fatGoal}
              </span>
            </div>
          </div>
          <div className="flex mb-2 items-center justify-start">
            <div className="w-full overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
              <div
                style={{width: `${(Number(fat) / fatGoal) * 100}%`}}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className='flex justify-center mt-[60px] font-inter font-bold text-[35px]'>Water</h1>
        <div>
          <h1 className=' flex justify-center mt-[10px] mb-[15px] font-inter'>{glassesDrunk} / {Number(waterGoal) * 1000}</h1>
        </div>
        <div className="flex justify-center">
          {indices.map((index) => (
            // console.log(index)
            <span key={index} className="material-symbols-outlined cursor-pointer" style={{fontSize: '80px'}} onClick={() => handleClick(index)}>
              {index < (glassesDrunk / 240) ? 'water_full' : 'glass_cup'}
            </span>
          ))}
        </div>
      </div>
      <h1 className='mt-[60px] font-inter font-bold text-[35px]'>Log</h1>
      <div className='grid grid-cols-[35rem,35rem] grid-rows1 gap-10 mt-[40px]'>
        <div className='flex justify-center'>
          <div>
            <h1 className='flex items-center justify-center font-poppins font-semibold mb-5'>Meals</h1>
            {meals && meals.length > 0 && (
              <>
                {Array.from(new Set(meals.map((item) => item.meal_type))).map((mealType, typeIndex) => (
                  <div key={typeIndex} className="mb-5">
                    <h2 className="text-xl font-semibold mb-2">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
                    {meals
                        .filter((item) => item.meal_type === mealType)
                        .map((item, index) => (
                          <div key={index} className="bg-white rounded-[12px] w-[350px] shadow-lg mb-3">
                            <div className="p-[20px] grid grid-cols-2">
                              <div>
                                <h3 className="font-[800] text-[1.2rem]">{item.meal_name}</h3>
                                {item.calories !== undefined && (
                                  <p className="text-[1rem] font-[500]">{`${item.gam}g - ${item.calories}cal`}</p>
                                )}
                              </div>
                              <div className="flex items-center justify-end">
                                <span className="material-symbols-outlined mr-2">edit</span>
                                <span className="material-symbols-outlined bg-slate-300 rounded-full">close_small</span>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                ))}
              </>
            )}

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
