import { handleRequest } from '../../utils/axios';

export const findCategoryAPI = async (data) => {
  const config = {
    url: '/category/search',
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getCategoryByIdAPI = async (id) => {
  const config = {
    url: `/category/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createCategoryAPI = async (data) => {
  const config = {
    url: '/category/',
    method: 'POST',
    data
  };

  return handleRequest(config);
};

export const updateCategoryAPI = async (data) => {
  const config = {
    url: '/category/',
    method: 'PUT',
    data
  };

  return handleRequest(config);
};

export const processCategoryAPI = async (id) => {
  const config = {
    url: `/category/process/${id}`,
    method: 'PUT'
  };
  return handleRequest(config);
};

export const deleteCategoryAPI = async (id) => {
  const config = {
    url: `/category/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const deleteCategorysAPI = async (ids) => {
  const config = {
    url: `/category/all/${ids.toString()}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};
