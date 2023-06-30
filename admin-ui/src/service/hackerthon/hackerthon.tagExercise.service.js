
import { handleRequest } from '../../utils/axios';

export const findTagExercisesAPI = async (data) => {
  const config = {
    url: '/tag-exercise/search',
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getTagExerciseByIdAPI = async (id) => {
  const config = {
    url: `/tag-exercise/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createTagExerciseAPI = async (data) => {
  const config = {
    url: '/tag-exercise/',
    method: 'POST',
    data
  };

  return handleRequest(config);
};

export const updateTagExerciseAPI = async (data) => {
  const config = {
    url: '/tag-exercise/',
    method: 'PUT',
    data
  };

  return handleRequest(config);
};
export const processTagExerciseAPI = async (id) => {
  const config = {
    url: `/tagexercise/process/${id}`,
    method: 'PUT'
  };
  return handleRequest(config);
};

export const deleteTagExerciseAPI = async (id) => {
  const config = {
    url: `/tag-exercise/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const deleteTagExercisesAPI = async (ids) => {
  const config = {
    url: `/tag-exercise/all/${ids.toString()}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};
