import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

interface IConfig {
  showSuccessMessage: boolean;
}

interface IRequestFunction<R> {
  successMessage?: string;
  args?: R;
}

export function useApiRequest<T = any, R = any>(
  fetcher: (...args: R[]) => Promise<T>,
  config?: IConfig
) {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState<T | undefined>(undefined);

  const requestFn = useCallback(
    async (params: IRequestFunction<R>) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const fetcherParams = [];

        if (params.args) fetcherParams.push(params.args);

        const response = await fetcher.apply(null, fetcherParams);

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
}

export default useApiRequest;
