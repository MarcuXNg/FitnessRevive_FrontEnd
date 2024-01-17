/* eslint-disable no-unused-vars */
// User.jsx
import React, {useEffect, useState} from 'react';
import CaloriesChart from '../../components/Chart/CaloriesChart';
import useInstance from '../../setup/instance';
import {toast} from 'react-toastify';

const User = () => {
  const {instance, controller} = useInstance();
  const [goal, setGoal] = useState();
  const [percent, setPercent] = useState(0);
  const getGoal = async () => {
    try {
      const res = await instance.get(`/users/goal/get`);
      if (res && res.data && res.data.EC === 0) {
        setGoal(res.data.DT);
        // toast.success(res.data.EM);
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
    getGoal();
  }, []);

  return (
    <div>
      <CaloriesChart percent={percent} calories={goal}/>
      <h1>EATEN</h1>
      <h1>BURNED</h1>
      <h1>Carbs</h1>
      <h1>Protein</h1>
      <h1>Fats</h1>
    </div>
  );
};

export default User;
