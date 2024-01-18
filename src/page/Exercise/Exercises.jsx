import React, {useState} from 'react';
import {Box} from '@mui/material';
import HeroBanner from './HeroBanner.jsx';
import Exercise from './Exercise';
import SearchExercises from './SearchExercises';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  return (
    <Box>
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercise setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  );
};

export default Exercises;
