import React from 'react';
import {Box, Stack, Typography} from '@mui/material';

const HeroBanner = () => (
  <Box sx={{mt: {lg: '212px', xs: '70px'}, ml: {sm: '50px'}}} position="relative" px="120px" pb="150px">
    <Typography color="#FF2625" fontWeight="600" fontSize="26px">Fitness Club</Typography>
    <Typography fontWeight={700} sx={{fontSize: {lg: '44px', xs: '40px'}}} mb="23px" mt="30px">
      Sweat, Smile <br />
      And Repeat
    </Typography>
    <Typography fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
      Check out the most effective exercises personalized to you
    </Typography>
    <Stack>
      <a href="#exercises" className='mt-[45px] no-underline w-[200px] text-center bg-[#FF2625] font-poppins p-[14px] text-[18px] text-white normal-case rounded-[8px]'>Explore Exercises</a>
    </Stack>
    <Typography fontWeight={600} color="#FF2625" sx={{opacity: '0.1', display: {lg: 'block', xs: 'none'}, fontSize: '200px'}}>
      Exercise
    </Typography>
    <img src={process.env.PUBLIC_URL + '/banner/banner.png'} alt="hero-banner" className="absolute right-[140px] top-[200px] w-[700px] h-[900px] mt-[-330px]" />
  </Box>
);

export default HeroBanner;
