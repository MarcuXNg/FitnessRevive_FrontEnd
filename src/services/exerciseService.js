import axios from '../setup/exerciseAxios';

// // Define the request options
// const options = {
//     method: 'GET',
//     url: '/exercises/bodyPart/back',
//     params: {limit: '10'},
//   };

//   // Make the request using the Axios instance
//   instance
//       .request(options)
//       .then((data) => {
//       // Handle successful response
//         console.log(data);
//       })
//       .catch((error) => {
//       // Handle error
//         console.error(error);
//       });

// searchExercises
const bodyPartList = async () => {
  try {
    return await axios.get('/exercises/bodyPartList');
  } catch (error) {
    console.log(error);
  }
};

const searchExercises = async () => {
  try {
    return await axios.get('/exercises');
  } catch (error) {
    console.log(error);
  }
};

export {
  searchExercises,
  bodyPartList,
};
