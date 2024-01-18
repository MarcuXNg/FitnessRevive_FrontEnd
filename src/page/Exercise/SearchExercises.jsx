import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import PropTypes from 'prop-types';

import {searchExercises, bodyPartList} from '../../services/exerciseService';
import HorizontalScrollBar from './HorizontalScrollBar.jsx';

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await bodyPartList();

      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await searchExercises();
      // console.log(exercisesData);

      const searchedExercises = exercisesData.filter(
          (item) => item.name.toLowerCase().includes(search) ||
               item.target.toLowerCase().includes(search) ||
               item.equipment.toLowerCase().includes(search) ||
               item.bodyPart.toLowerCase().includes(search),
      );

      window.scrollTo({top: 1800, left: 100, behavior: 'smooth'});
      setSearch('');
      // console.log(searchedExercises);
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{fontSize: {lg: '44px', xs: '30px'}}} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{input: {fontWeight: '700', border: 'none', borderRadius: '4px'}, width: {lg: '1170px', xs: '350px'}, backgroundColor: '#fff', borderRadius: '8px'}}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className="search-btn hover:bg-[#FF2625] hover:border-[1px] hover:border-solid hover:border-[#FF2625]" sx={{bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: {lg: '173px', xs: '80px'}, height: '56px', position: 'absolute', right: '0px', fontSize: {lg: '20px', xs: '14px'}}} onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{position: 'relative', width: '75%', p: '20px'}}>
        <HorizontalScrollBar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  );
};

SearchExercises.propTypes = {
  setExercises: PropTypes.func.isRequired,
  bodyPart: PropTypes.string.isRequired,
  setBodyPart: PropTypes.func.isRequired,
};

export default SearchExercises;
