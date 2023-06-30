
import { handleRequest } from '../../utils/axios';

export const findExamExercisesAPI = async (data) => {
  const config = {
    url: '/exam-exercise/search',
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getExamExerciseByIdAPI = async (id) => {
  const config = {
    url: `/exam-exercise/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createExamExerciseAPI = async (data) => {
  const config = {
    url: '/exam-exercise/',
    method: 'POST',
    data
  };

  return handleRequest(config);
};

export const updateExamExerciseAPI = async (data) => {
  const config = {
    url: '/exam-exercise/',
    method: 'PUT',
    data
  };

  return handleRequest(config);
};
export const processExamExerciseAPI = async (id) => {
  const config = {
    url: `/examexercise/process/${id}`,
    method: 'PUT'
  };
  return handleRequest(config);
};

export const deleteExamExerciseAPI = async (id) => {
  const config = {
    url: `/exam-exercise/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const deleteExamExercisesAPI = async (ids) => {
  const config = {
    url: `/exam-exercise/all/${ids.toString()}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};
