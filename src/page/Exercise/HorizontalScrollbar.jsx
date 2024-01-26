import React from 'react';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {Box} from '@mui/material';
import PropTypes from 'prop-types';
import RightArrow from '../../components/Arrow/RightArrow';
import LeftArrow from '../../components/Arrow/LeftArrow';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';

const HorizontalScrollbar = ({data, bodyParts, setBodyPart, bodyPart}) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Box
          key={item.id || item}
          itemID={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          {bodyParts ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} /> }
        </Box>
      ))}
    </ScrollMenu>
  );
};

HorizontalScrollbar.propTypes = {
  data: PropTypes.array.isRequired,
  bodyParts: PropTypes.bool,
  setBodyPart: PropTypes.func,
  bodyPart: PropTypes.string,
};

export default HorizontalScrollbar;

