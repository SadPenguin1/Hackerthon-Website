import { handleRequest } from '../../utils/axios';

export const findSolutionAPI = async (data) => {
  const config = {
    url: '/solution/search',
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getSolutionByIdAPI = async (id) => {
  const config = {
    url: `/solution/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createSolutionAPI = async (data) => {
  const { fileObj, ...others } = data;

  const formData = new FormData();
  formData.append("file", fileObj);
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in others) {
    if (key === 'exercise')
      formData.append('exercise.id', others[key].id);
    else
      formData.append(key, others[key]);
  }

  const config = {
    url: '/solution/',
    method: 'POST',
    //data: formData,
    data
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  };

  return handleRequest(config);
};

export const updateSolutionAPI = async (data) => {
  const config = {
    url: '/solution/',
    method: 'PUT',
    data
  };

  return handleRequest(config);
};

export const processSolutionAPI = async (id) => {
  const config = {
    url: `/solution/process/${id}`,
    method: 'PUT'
  };
  return handleRequest(config);
};

export const deleteSolutionAPI = async (id) => {
  const config = {
    url: `/solution/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const deleteSolutionsAPI = async (ids) => {
  const config = {
    url: `/solution/all/${ids.toString()}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};
