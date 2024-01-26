import axios from '../setup/exerciseAxios';

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
    return await axios.get('/exercises?limit=9999');
  } catch (error) {
    console.log(error);
  }
};

const getBodyPart = async (bodyPart) => {
  try {
    const data = bodyPart;
    return await axios.get(`/exercises/bodyPart/${data}`);
  } catch (error) {
    console.log(error);
  }
};

const fetchExerciseDetailData = async (id) => {
  try {
    return await axios.get(`/exercises/exercise/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const fetchEquimentExercisesData = async (equipment) => {
  try {
    return await axios.get(`/exercises/equipment/${equipment}`);
  } catch (error) {
    console.log(error);
  }
};

const fetchTargetMuscleExercisesData = async (target) => {
  try {
    return await axios.get(`/exercises/target/${target}`);
  } catch (error) {
    console.log(error);
  }
};


export {
  searchExercises,
  bodyPartList,
  getBodyPart,
  fetchExerciseDetailData,
  fetchEquimentExercisesData,
  fetchTargetMuscleExercisesData,
};
