import React from 'react';
import {Stack, Typography} from '@mui/material';
import PropTypes from 'prop-types';

const BodyPart = ({item, setBodyPart, bodyPart}) => {
  // console.log(item);
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={bodyPart === item ? {borderTop: '4px solid #FF2625', background: '#fff', borderBottomLeftRadius: '20px', width: '270px', height: '282px', cursor: 'pointer', gap: '47px'} : {background: '#fff', borderBottomLeftRadius: '20px', width: '270px', height: '282px', cursor: 'pointer', gap: '47px'}}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({top: 1800, left: 100, behavior: 'smooth'});
      }}
    >
      <img src={process.env.PUBLIC_URL + '/icon/gym.png'} alt="dumbbell" style={{width: '40px', height: '40px'}} />
      <Typography fontSize="24px" fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize"> {item}</Typography>
    </Stack>
  );
};

BodyPart.propTypes = {
  item: PropTypes.string.isRequired,
  setBodyPart: PropTypes.func.isRequired,
  bodyPart: PropTypes.string.isRequired,
};

export default BodyPart;
