import React, {useContext} from 'react';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import {Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';

const LeftArrow = () => {
  const {scrollPrev} = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <span className="material-symbols-outlined">
        arrow_forward
      </span>
    </Typography>
  );
};

const RightArrow = () => {
  const {scrollNext} = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <span className="material-symbols-outlined">
        arrow_back
      </span>
    </Typography>
  );
};

const HorizontalScrollbar = ({data, bodyParts, setBodyPart, bodyPart}) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {data.map((item) => (
      <Box
        key={item.id || item}
        itemId={item.id || item}
        title={item.id || item}
        m="0 40px"
      >
        {bodyParts ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} /> }
      </Box>
    ))}
  </ScrollMenu>
);

HorizontalScrollbar.propTypes = {
  data: PropTypes.array.isRequired,
  bodyParts: PropTypes.bool,
  setBodyPart: PropTypes.func,
  bodyPart: PropTypes.any,
};

export default HorizontalScrollbar;
