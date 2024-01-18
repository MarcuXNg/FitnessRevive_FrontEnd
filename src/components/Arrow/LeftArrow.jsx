import React, {useContext} from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {Typography} from '@mui/material';

const LeftArrow = () => {
  const {isFirstItemVisible, scrollPrev} = useContext(VisibilityContext);

  return (
    <Typography disabled={isFirstItemVisible} onClick={() => scrollPrev()} className="left-arrow right-arrow cursor-pointer bg-transparent outline-none border-none flex justify-center items-center text-[#FF2625] text-[25px] rounded-[4px] absolute bottom-[-20px] right-[80px]">
      <img src={process.env.PUBLIC_URL + '/icon/left-arrow.png'} alt="left-arrow" />
    </Typography>
  );
};

export default LeftArrow;
