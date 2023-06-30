
import { axiosBlog } from '../../utils/axios';

export const findBlogTagsAPI = async (data) => {
  const config = {
    url: '/tag/search',
    method: 'POST',
    data
  }
  return handleRequest(config)
}

export const getBlogTagByIdAPI = async (id) => {
  const config = {
    url: `/tag/${id}`,
    method: 'GET'
  }
  return handleRequest(config)
}

export const createBlogTagAPI = async (data) => {
  const config = {
    url: '/tag/new',
    method: 'POST',
    data
  }

  return handleRequest(config)
};

export const updateBlogTagAPI = async (data) => {
  const config = {
    url: '/tag/update',
    method: 'PUT',
    data
  }

  return handleRequest(config)
}

export const deleteBlogTagAPI = async (id) => {
  const config = {
    url: `/tag/delete/${id}`,
    method: 'DELETE'
  }
  return handleRequest(config)
}

export const deleteBlogTagsAPI = async (ids) => {
  const config = {
    url: `/tag/delete-all/${ids.toString()}`,
    method: 'DELETE'
  }
  return handleRequest(config)
}

const handleRequest = async (config) => {
  try {
    const resp = await axiosBlog(config);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error.response)
      return (error.response.data)

    return ({ code: "408", message: error.message })
  }
}
