import { useSnackbar } from 'notistack';
import useSWR from 'swr';
import { generateGetUrl } from '../api/awsApi';

export const useImageSrc = (src: string) => {
  const async = src.indexOf('http') === -1;
  const { enqueueSnackbar } = useSnackbar();

  const { data, error } = useSWR(async ? src : null, () => generateGetUrl({ key: src }));

  if (error) {
    enqueueSnackbar(error?.response?.data?.message || error?.message, {
      variant: 'error',
    });

    throw error;
  }

  return async ? data?.url || '' : src;
};
