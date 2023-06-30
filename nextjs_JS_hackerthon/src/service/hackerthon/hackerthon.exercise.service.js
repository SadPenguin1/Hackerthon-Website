import { handleRequest } from '../../utils/axios';

export const findExerciseAPI = async (data) => {
  const config = {
    url: '/exercise/search',
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getExerciseByIdAPI = async (id) => {
  const config = {
    url: `/exercise/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createExerciseAPI = async (data) => {
  const { fileObj, ...others } = data;

  const formData = new FormData();
  formData.append("file", fileObj);
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in others) {
    if (key === 'category')
      formData.append('category.id', others[key].id);
    else
      formData.append(key, others[key]);
  }

  const config = {
    url: '/exercise/',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  return handleRequest(config);
};

export const updateExerciseAPI = async (data) => {
  const config = {
    url: '/exercise/',
    method: 'PUT',
    data
  };

  return handleRequest(config);
};

export const processExerciseAPI = async (id) => {
  const config = {
    url: `/exercise/process/${id}`,
    method: 'PUT'
  };
  return handleRequest(config);
};

export const deleteExerciseAPI = async (id) => {
  const config = {
    url: `/exercise/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const deleteExercisesAPI = async (ids) => {
  const config = {
    url: `/exercise/all/${ids.toString()}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};
