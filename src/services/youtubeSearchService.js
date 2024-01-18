import instance from '../setup/youtubeAxios';

// searchExercises
const youtubeSearch = async (name) => {
  try {
    return await instance.get(`/search?query=${name} exercise`);
  } catch (error) {
    console.log(error);
  }
};


export {
  youtubeSearch,
};

