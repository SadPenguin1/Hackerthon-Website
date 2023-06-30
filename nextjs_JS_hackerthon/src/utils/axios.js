import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: process.env.HOST_API_KEY || '' });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
export const axiosMedia = axios.create({
  baseURL: 'http://localhost:8820',
  timeout: 60000
});
export const axiosCheckCode = axios.create({
  baseURL: 'http://13.115.168.2//api/compile',
  timeout: 60000
});

export default axiosInstance;

export const handleRequest = async (config) => {
  try {
    const resp = await axiosMedia(config);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error.response)
      return (error.response.data);

    return ({ code: "408", message: error.message });
  }
};
export const handleRequestCheckCode = async (config) => {
  try {
    const resp = await axiosCheckCode(config);
    return resp.data;
  } catch (error) {
    console.log(error);
    if (error.response)
      return (error.response.data);

    return ({ code: "408", message: error.message });
  }
};