// import { toast } from "react-toastify";
// import { getToken, login } from "adalConfig";
// import axios from "axios";
// import { makeUseAxios } from "axios-hooks";

// const axiosInstance = axios.create({
//   baseURL: "/api",
// });

// axiosInstance.interceptors.request.use(
//   (config) =>
//     getToken().then(
//       (token) => {
//         config.headers = {
//           // custom headers:
//           ...config.headers,
//           Authorization: `Bearer ${token}`,
//         };
//         return config;
//       },
//       (error) => {
//         login();
//         return error;
//       }
//     ),
//   (error) => error
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     let serverMessage = error?.response?.data?.message;
//     let serverDetails = error?.response?.data?.details;

//     const message =
//       serverMessage ||
//       `Unknown error has occurred.
//       Please contact Soprano team.`;

//     if (error?.response?.status === 401) {
//       login();
//     }

//     // do not show error if response is cancelled (eg. on fast tabs switching)
//     if (!axios.isCancel(error) && error?.response) {
//       toast.error(message, {
//         autoClose: false,
//       });
//     }
//     if (serverDetails) {
//       console.error(`API response error serverDetails: ${serverDetails}`);
//     }
//     return Promise.reject(error);
//   }
// );

// export const useAxios = makeUseAxios({
//   axios: axiosInstance,
// });
