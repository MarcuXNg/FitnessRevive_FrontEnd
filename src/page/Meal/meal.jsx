/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {fetchFood} from '../../services/foodService.js';

const Meal = () => {
  const [apiData, setApiData] = useState({});
  const [food, setFood] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [staticNumber, setStaticNumber] = useState(2000);
  const [initialStaticNumber, setInitialStaticNumber] = useState(2000);

  const displayData = async () => {
    try {
      const res = await fetchFood(food, 'en');
      console.log(res);
      const firstDish = res.dishes[0];

      if (firstDish) {
        setApiData({
          name: firstDish.name,
          caloric: firstDish.caloric,
          fat: firstDish.fat,
          protein: firstDish.protein,
        });
      } else {
        setApiData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToSearchHistory = () => {
    if (apiData.name) {
      setSearchHistory([...searchHistory, apiData]);
      setStaticNumber(staticNumber - parseFloat(apiData.caloric)); // Giảm giá trị staticNumber
      setApiData({}); // Clear apiData after adding to search history
    }
  };

  const calculateTotalCalories = () => {
    return searchHistory.reduce((totalCalories, item) => totalCalories + parseFloat(item.caloric), 0);
  };

  const compareWithStaticNumber = () => {
    if (calculateTotalCalories() > initialStaticNumber + 100) {
      return 'Too much calories.';
    } else if (calculateTotalCalories() < initialStaticNumber - 100) {
      return 'Too little calories.';
    } else {
      return 'great.';
    }
  };

  const removeFromSearchHistory = (index) => {
    const removedItem = searchHistory[index];
    setSearchHistory((prevSearchHistory) => {
      const updatedSearchHistory = [...prevSearchHistory];
      updatedSearchHistory.splice(index, 1);
      setStaticNumber((prevStaticNumber) => prevStaticNumber + parseFloat(removedItem.caloric)); // Cộng lại giá trị caloric
      return updatedSearchHistory;
    });
  };

  const handleSearch = async (input) => {
    const data = input.toLowerCase();
    setFood(data);
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-md">
      <p className="text-lg font-semibold">Total energy needed: {initialStaticNumber} calories/day</p>
      <div className="flex flex-col">
        <label htmlFor="searchFood" className="block text-sm font-medium text-gray-700">
          Search
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="food"
            id="FoodSearch"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            placeholder="Food Search"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </div>
        <button
          type="button"
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={displayData}
        >
          Search
        </button>
        {apiData.name && (
          <button
            type="button"
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={addToSearchHistory}
          >
            Add to list
          </button>
        )}
      </div>
      {apiData.name && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Results:</h2>
          <p className="mt-2">
            <span className="font-semibold">Name:</span> {apiData.name}
          </p>
          <p>
            <span className="font-semibold">Caloric Value:</span> {apiData.caloric}
          </p>
          <p>
            <span className="font-semibold">Fat:</span> {apiData.fat}
          </p>
          <p>
            <span className="font-semibold">Protein:</span> {apiData.protein}
          </p>
        </div>
      )}

      {searchHistory.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Food picked:</h2>
          <ul className="list-disc list-inside">
            {searchHistory.map((item, index) => (
              <li key={index}>
                {item.name}: {item.caloric}
                <button
                  type="button"
                  className="ml-2 text-sm text-red-500"
                  onClick={() => removeFromSearchHistory(index)}
                >
                Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total Calories: {calculateTotalCalories()}</p>
        </div>
      )}
      <p>Total calories left: {staticNumber}</p>
      <p>{compareWithStaticNumber()}</p>
    </div>
  );
};

export default Meal;
