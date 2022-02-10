import { Producers } from 'types/Producers';
import { useAxios } from 'utils/hooks/useAxios';

export const useGetProducers = () => {
  const [{ data: producers, loading: isLoadingProducers }, getProducers] =
    useAxios<Producers[]>(
      {
        url: `/producers`,
      },
      { manual: true },
    );
  return {
    producers,
    getProducers,
    isLoadingProducers,
  };
};
