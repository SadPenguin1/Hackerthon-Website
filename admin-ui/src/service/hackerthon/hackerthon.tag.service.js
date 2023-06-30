
import { handleRequest } from '../../utils/axios';

export const findTagsAPI = async (data) => {
  const config = {
    url: '/tag/search',
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getTagByIdAPI = async (id) => {
  const config = {
    url: `/tag/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createTagAPI = async (data) => {
  const config = {
    url: '/tag/',
    method: 'POST',
    data
  };

  return handleRequest(config);
};

export const updateTagAPI = async (data) => {
  const config = {
    url: '/tag/',
    method: 'PUT',
    data
  };

  return handleRequest(config);
};

export const deleteTagAPI = async (id) => {
  const config = {
    url: `/tag/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const deleteTagsAPI = async (ids) => {
  const config = {
    url: `/tag/all/${ids.toString()}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};
