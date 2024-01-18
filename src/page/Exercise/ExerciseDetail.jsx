/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';

// import {exerciseOptions, fetchData, youtubeOptions} from '../utils/fetchData';
import {fetchExerciseDetailData, fetchTargetMuscleExercisesData, fetchEquimentExercisesData} from '../../services/exerciseService';
import {youtubeSearch} from '../../services/youtubeSearchService';
import Detail from './Detail';
import ExerciseVideos from './ExerciseVideos';
import SimilarExercises from './SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const {id} = useParams();

  const fetchExercisesData = async () => {
    //   console.log(id);
    const exerciseDetailData = await fetchExerciseDetailData(id);
    //   console.log(exerciseDetailData);
    setExerciseDetail(exerciseDetailData);

    const Exname = exerciseDetailData.name;

    const exerciseVideosData = await youtubeSearch(Exname);
    //   console.log(exerciseVideosData.contents);
    setExerciseVideos(exerciseVideosData.contents);

    const targetMuscleExercisesData = await fetchTargetMuscleExercisesData(exerciseDetailData.target);
    // console.log(targetMuscleExercisesData);
    setTargetMuscleExercises(targetMuscleExercisesData);


    const equimentExercisesData = await fetchEquimentExercisesData(exerciseDetailData.equipment);
    // console.log(equimentExercisesData);
    setEquipmentExercises(equimentExercisesData);
  };

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});


    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;
  const {name} = exerciseDetail;

  return (
    <Box sx={{mt: {lg: '96px', xs: '60px'}}}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={name || 'Default Name'} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
