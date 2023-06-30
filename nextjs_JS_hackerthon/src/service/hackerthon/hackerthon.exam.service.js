import { handleRequest } from '../../utils/axios';

export const findExamAPI = async (data) => {
  const config = {
    url: '/exam/search',
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getExamByIdAPI = async (id) => {
  const config = {
    url: `/exam/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createExamAPI = async (data) => {
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
    url: '/exam/',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  return handleRequest(config);
};

export const updateExamAPI = async (data) => {
  const config = {
    url: '/exam/',
    method: 'PUT',
    data
  };

  return handleRequest(config);
};

export const processExamAPI = async (id) => {
  const config = {
    url: `/exam/process/${id}`,
    method: 'PUT'
  };
  return handleRequest(config);
};

export const deleteExamAPI = async (id) => {
  const config = {
    url: `/exam/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const deleteExamsAPI = async (ids) => {
  const config = {
    url: `/exam/all/${ids.toString()}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};
