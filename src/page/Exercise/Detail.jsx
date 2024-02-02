import React, {useState, useEffect} from 'react';
import {Typography, Stack, Button} from '@mui/material';
import PropTypes from 'prop-types';
import ExerciesPopup from '../../components/Popup/ExerciesPopup';
import useInstance from '../../setup/instance';
import {toast} from 'react-toastify';


const Detail = ({exerciseDetail}) => {
  const [show, setShow] = useState(false);
  const [weight, setWeight] = useState();
  // console.log(exerciseDetail);
  const {bodyPart, gifUrl, name, target, equipment, instructions} = exerciseDetail;

  const {instance, controller} = useInstance();
  const getUserData = async () => {
    try {
      const res = await instance.get('/user/body/get');
      if (res && res.data && res.data.EC === 0) {
        if (res && res.data && res.data.DT && res.data.DT.weight) {
          setWeight(res.data.DT.weight);
        } else {
          toast.error(res.data.EM);
        }
      } else {
        toast.error(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const extraDetail = [
    {
      icon: process.env.PUBLIC_URL + '/exercise/body-part.png',
      name: bodyPart,
    },
    {
      icon: process.env.PUBLIC_URL + '/exercise/target.png',
      name: target,
    },
    {
      icon: process.env.PUBLIC_URL + '/exercise/equipment.png',
      name: equipment,
    },
  ];

  const handleAddExercises = async () => {
    await getUserData();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Stack gap="60px" sx={{flexDirection: {lg: 'row'}, p: '20px', alignItems: 'center'}} className='ml-[200px]'>
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image w-[729px] h-[742px]" />
      <Stack sx={{gap: {lg: '35px', xs: '20px'}}}>
        <Typography sx={{fontSize: {lg: '64px', xs: '30px'}}} fontWeight={700} textTransform="capitalize">
          {name}
        </Typography>
        <Typography sx={{fontSize: {lg: '24px', xs: '18px'}}} color="#4F4C4C">
          Exercises keep you strong.{' '}
          <span style={{textTransform: 'capitalize'}}>{name}</span> bup is one
          of the best <br /> exercises to target your {target}. It will help you improve your{' '}
          <br /> mood and gain energy.
        </Typography>
        {extraDetail?.map((item, index) => (
          <Stack key={`${item.icon}-${item.name}-${index}`} direction="row" gap="24px" alignItems="center">
            <Button sx={{background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px'}}>
              <img src={item.icon} alt={bodyPart} style={{width: '50px', height: '50px'}} />
            </Button>
            <Typography textTransform="capitalize" sx={{fontSize: {lg: '30px', xs: '20px'}}}>
              {item.name}
            </Typography>
          </Stack>
        ))}
        <button className='text-white rounded-[9px] bg-red-500 w-[200px] h-[70px] hover:bg-[#EDF1F7] hover:text-red-500 font-poppins font-medium' onClick={handleAddExercises}>
          Add Exercise to daily Dairy
        </button>
        <ExerciesPopup show={show} handleClose={handleClose} name={name} weight={weight}/>
        <Typography sx={{fontSize: {lg: '40px', xs: '18px'}}} fontWeight={600} textTransform="capitalize">
          Instruction
        </Typography>
        {instructions && instructions.length > 0 && (
          <Stack>
            {instructions.map((instruction, index) => (
              <Typography sx={{fontSize: {lg: '22px', xs: '16px'}}} color="#4F4C4C" key={index}>{index +1}.{instruction}</Typography>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

Detail.propTypes = {
  exerciseDetail: PropTypes.object.isRequired,
};

export default Detail;
