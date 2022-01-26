import { useCallback } from 'react';
import { useAxios } from 'utils/hooks/useAxios';

export const useAuth = () => {
  const [, postAuth] = useAxios(
    {
      url: `/auth`,
      method: 'POST',
    },
    { manual: true },
  );

  const authenticate = useCallback(
    async (login: string, password: string) => {
      const data = { login, password };
      return await postAuth({ data });
    },
    [postAuth],
  );
  return { authenticate };
};
