import { toast } from 'react-toastify';
import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const state = JSON.parse(sessionStorage.getItem('state') || '{}');

    const token = state?.user?.accessToken;

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let serverMessage = error?.response?.data?.message;
    let serverDetails = error?.response?.data?.details;

    debugger;
    const message =
      serverMessage ||
      `Unknown error has occurred. 
      Please contact Soprano team.`;

    if (error?.response?.status === 401) {
      sessionStorage.removeItem('state');
      window.location.reload();
    }

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
