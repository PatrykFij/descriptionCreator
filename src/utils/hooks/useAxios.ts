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

    const message = serverMessage || `Nieznany błąd zapraszam do Patryka`;

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

    return Promise.reject(error);
  },
);

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
