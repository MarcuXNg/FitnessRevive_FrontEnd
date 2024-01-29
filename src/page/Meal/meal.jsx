/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {fetchFood} from '../../services/foodService.js';
import useInstance from '../../setup/instance';
import MealPopup from '../../components/Popup/MealPopUp.jsx';

const Meal = () => {
  const {instance, controller} = useInstance();
  const [show, setShow] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [food, setFood] = useState('');
  const [name, setName] = useState();
  const [calories, setCalories] = useState();
  const [carb, setCarb] = useState();
  const [fat, setFat] = useState();
  const [protein, setProtein] = useState();

  const saveMeal = async (name, calories, carb, fat, protein, type, gam, date) => {
    try {
      const res = await instance.post(`/user/calories/consumed/${date}`, {
        name, calories, carb, fat, protein, type, gam,
      });
      if (res && res.data && res.data.EC === 0) {
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

  const handlePopUp = async (name, calories, carb, fat, protein) => {
    setName(name);
    setCalories(calories);
    setCarb(carb);
    setFat(fat);
    setProtein(protein);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

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
            <div key={index} className='bg-white rounded-[12px] w-[350px] shadow-lg mb-5 p-4'>
              <p className='flex justify-center font-inter font-semibold'>{item.name}</p>
              <div className="grid grid-cols-[auto,50px]">
                <div>
                  <p><span className='font-medium font-poppins'>Calo: </span>{item.caloric}</p>
                  <p><span className='font-medium font-poppins'>Carb: </span>{item.carbon}</p>
                  <p><span className='font-medium font-poppins'>Fat: </span>{item.fat}</p>
                  <p><span className='font-medium font-poppins'>Protein: </span>{item.protein}</p>
                </div>
                <div className='flex justify-center items-center'>
                  <button className='bg-red-500 p-[10px] rounded-lg text-white' onClick={() => handlePopUp(item.name, item.caloric, item.carbon, item.fat, item.protein)}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MealPopup show={show} handleClose={handleClose} name={name} calories={calories} carb={carb} fat={fat} protein={protein} saveMeal={saveMeal}/>
    </div>
  );
};

export default Meal;
