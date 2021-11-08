import { toast } from 'react-toastify';
import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const axiosInstance = axios.create({
  baseURL: '/.netlify/functions',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  },

  (error) => error,
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let serverMessage = error?.response?.data?.message;
    let serverDetails = error?.response?.data?.details;

    const message = serverMessage || `Nieznany błąd.`;

    // if (error?.response?.status === 401) {
    //   login();
    // }

    // do not show error if response is cancelled (eg. on fast tabs switching)
    if (!axios.isCancel(error) && error?.response) {
      toast.error(message, {
        autoClose: false,
      });
    }
    if (serverDetails) {
      console.error(`API response error serverDetails: ${serverDetails}`);
    }
    return Promise.reject(error);
  },
);

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
