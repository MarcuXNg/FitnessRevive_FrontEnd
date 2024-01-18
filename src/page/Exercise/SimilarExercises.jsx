import React from 'react';
import {Typography, Box, Stack} from '@mui/material';
import PropTypes from 'prop-types';

import HorizontalScrollBar from './HorizontalScrollBar';
import Loader from '../../components/Loader/Loader';

const SimilarExercises = ({targetMuscleExercises, equipmentExercises}) => {
  return (
    <Box sx={{mt: {lg: '100px', xs: '0px'}}}>
      <Typography sx={{fontSize: {lg: '44px', xs: '25px'}, ml: '20px'}} fontWeight={700} color="#000" mb="33px" mr="40px" className='text-center'>
            Similar <span style={{color: '#FF2625', textTransform: 'capitalize'}}>Target Muscle</span> exercises
      </Typography>
      <Stack direction="row" sx={{p: 2, position: 'relative'}}>
        {targetMuscleExercises.length !== 0 ? <HorizontalScrollBar data={targetMuscleExercises} /> : <Loader />}
      </Stack>
      <Typography sx={{fontSize: {lg: '44px', xs: '25px'}, ml: '20px', mt: {lg: '100px', xs: '60px'}}} fontWeight={700} color="#000" mb="33px" mr="40px" className='text-center'>
            Similar <span style={{color: '#FF2625', textTransform: 'capitalize'}}>Equipment</span> exercises
      </Typography>
      <Stack direction="row" sx={{p: 2, position: 'relative'}}>
        {equipmentExercises.length !== 0 ? <HorizontalScrollBar data={equipmentExercises} /> : <Loader />}
      </Stack>
    </Box>
  );
};

SimilarExercises.propTypes = {
  targetMuscleExercises: PropTypes.array.isRequired,
  equipmentExercises: PropTypes.array.isRequired,
};

export default SimilarExercises;
