import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

interface IConfig {
  showSuccessMessage: boolean;
}

export const useApiRequest = (fetcher: any, config?: IConfig) => {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);

  const requestFn = useCallback(
    async (params) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const response = await fetcher(params.args);

        if (params.successMessage && config?.showSuccessMessage) {
          enqueueSnackbar(params.successMessage, { variant: 'success' });
        }

        setData(response);
        setIsLoading(false);

        return response;
      } catch (e: any) {
        setError(e);
        setIsLoading(false);

        enqueueSnackbar(e?.response?.data?.message || e?.message, {
          variant: 'error',
        });

        throw e;
      }
    },
    [config?.showSuccessMessage, enqueueSnackbar, fetcher]
  );

  return {
    data,
    error,
    isLoading,
    requestFn,
  };
};

export default useApiRequest;
