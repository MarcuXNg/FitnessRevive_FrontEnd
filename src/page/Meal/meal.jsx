/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {fetchFood} from '../../services/foodService.js';

const Meal = () => {
  const [apiData, setApiData] = useState([]);
  const [food, setFood] = useState('');
  const displayData = async () => {
    try {
      if (food) {
        const res = await fetchFood(food, 'en');
        console.log(res);
        if (res && res.dishes) {
          setApiData(res.dishes);
        } else {
          // Handle the case where 'dishes' property is missing
          console.error('Invalid response format:', res);
          // You might want to set an empty array or handle it differently based on your requirements
          setApiData([]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Always clear the search input, regardless of success or failure
      setFood('');
    }
  };

  return (
    <div className="mx-auto mt-10 p-4 w-full">
      <div className="flex flex-col mx-auto w-[600px]">
        <label htmlFor="searchFood" className="block text-sm font-medium text-gray-700">
          Search
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="food"
            id="FoodSearch"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-[600px] h-[50px] rounded-md sm:text-sm border-gray-300"
            placeholder="Food Search"
            onChange={(event) => setFood((event.target.value).toLowerCase())}
            value={food}
          />
        </div>
        <button
          type="button"
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={displayData}
        >
          Search
        </button>
      </div>
      <div className='mx-auto w-full justify-center flex mt-10'>
        <div className='grid grid-cols-3 gap-10'>
          {apiData && apiData.length > 0 && apiData.map((item, index) => (
            <div key={index} className='bg-white rounded-[12px] w-[350px] shadow-lg mb-5'>
              <p>{item.name}</p>
              <p>{item.caloric}</p>
              <p>{item.carbon}</p>
              <p>{item.fat}</p>
              <p>{item.protein}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meal;
