/* eslint-disable quotes */
import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import {Box, Stack, Typography} from '@mui/material';
import PropTypes from 'prop-types';

import {searchExercises, getBodyPart} from '../../services/exerciseService';
import ExerciseCard from './ExerciseCard';
import Loader from '../../components/Loader/Loader.jsx';

const Exercise = ({exercises, setExercises, bodyPart}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(9);

  useEffect(() => {
    const fetchExercisesData = async () => {
      if (bodyPart === 'all') {
        const exercisesData = await searchExercises();
        // console.log(exercisesData);
        setExercises(Object.values(exercisesData));
      } else {
        const exercisesData = await getBodyPart(bodyPart);
        // console.log(exercisesData);
        setExercises(Object.values(exercisesData));
      }
    };

    fetchExercisesData();
  }, [bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({top: 1800, behavior: 'smooth'});
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{mt: {lg: '109px'}}} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{fontSize: {lg: '44px', xs: '30px'}}} mb="46px">Showing Results</Typography>
      <Stack direction="row" sx={{gap: {lg: '107px', xs: '50px'}}} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{mt: {lg: '114px', xs: '70px'}}} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

Exercise.propTypes = {
  exercises: PropTypes.array.isRequired,
  setExercises: PropTypes.func.isRequired,
  bodyPart: PropTypes.string.isRequired,
};

export default Exercise;
