import { useCallback, useState } from 'react';

export const useApiRequest = (fetcher: any) => {
  //   const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);

  const requestFn = useCallback(
    async (params) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const response = await fetcher(params.args);

        // if (params.successMessage) {
        //   enqueueSnackbar(params.successMessage, { variant: 'success' });
        // }

        setData(response);
        setIsLoading(false);

        return response;
      } catch (e: any) {
        setError(e);
        setIsLoading(false);

        // enqueueSnackbar(e?.response?.data?.message || e?.message, {
        //   variant: 'error',
        // });

        throw e;
      }
    },
    [fetcher]
  );

  return {
    data,
    error,
    isLoading,
    requestFn,
  };
};

export default useApiRequest;
