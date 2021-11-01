import { AxiosError } from "axios";

export const handleException = (error: AxiosError) => {
  // Axios errors should already be handled by Axios interceptor, so only print non-Axios errors to the console
  if (!error.isAxiosError) {
    console.error(error);
  }
};
