import { handleRequest, handleRequestCheckCode } from '../../utils/axios';

export const findAnswerAPI = async (data) => {
  const config = {
    url: '/answer/search',
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getAnswerByIdAPI = async (id) => {
  const config = {
    url: `/answer/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createAnswerAPI = async (data) => {
  const config = {
    url: '/answer/',
    method: 'POST',
    data
  };

  return handleRequest(config);
};

export const updateAnswerAPI = async (data) => {
  const config = {
    url: '/answer/',
    method: 'PUT',
    data
  };

  return handleRequest(config);
};

export const processAnswerAPI = async (id) => {
  const config = {
    url: `/answer/process/${id}`,
    method: 'PUT'
  };
  return handleRequest(config);
};

export const deleteAnswerAPI = async (id) => {
  const config = {
    url: `/answer/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const deleteAnswersAPI = async (ids) => {
  const config = {
    url: `/answer/all/${ids.toString()}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const checkCodeJsonAPI = async (data) => {
  var config = {
    url: '/checkcode/',
    method: 'POST',
    data
  };

  return handleRequest(config);
};
