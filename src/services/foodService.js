import {instance} from '../setup/foodAxios';

const fetchFood = async (name, lang) => {
  try {
    return await instance.get(`apiFood.php`, {params: {name, lang}});
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchFood,
};
