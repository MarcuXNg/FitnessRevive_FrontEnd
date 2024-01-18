import React, {useContext} from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {Typography} from '@mui/material';

const RightArrow = () => {
  const {isFirstItemVisible, scrollNext} = useContext(VisibilityContext);

  return (
    <Typography disabled={isFirstItemVisible} onClick={() => scrollNext()} className="right-arrow cursor-pointer bg-transparent outline-none border-none flex justify-center items-center text-[#FF2625] text-[25px] rounded-[4px] absolute bottom-[-20px] right-[40px]">
      <img src={process.env.PUBLIC_URL + '/icon/right-arrow.png'} alt="right-arrow" />
    </Typography>
  );
};

export default RightArrow;
