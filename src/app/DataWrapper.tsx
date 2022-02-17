import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  createApiClientRequestInterceptor,
  createApiClientResponseInterceptor,
  setApiAuthorizationHeader,
} from '../api/apiClient';
import { refreshToken } from '../api/authApi';
import Loader from '../components/Loader';
import { getMe } from '../api/userApi';
import { useAppContext } from '../store';
import { logOutUser, authUser, setUserData } from '../store/actions';

interface IProps {
  children: React.ReactNode;
}

const DataWrapper = ({ children }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = useCallback(async () => {
    try {
      const { accessToken } = await refreshToken();
      if (accessToken) {
        setApiAuthorizationHeader(accessToken);
        createApiClientRequestInterceptor(() => dispatch(logOutUser()));
        createApiClientResponseInterceptor(() => dispatch(logOutUser()));

        const res = await getMe();

        authUser(true);
        setUserData(res);
      }
    } catch (e: any) {
      if (e?.response?.status !== 404)
        enqueueSnackbar(e.response?.data?.message || e.message, {
          variant: 'error',
        });
    }
  }, [dispatch, enqueueSnackbar]);

  useLayoutEffect(() => {
    getCurrentUser().then(() => setIsLoading(false));
  }, [getCurrentUser]);

  return isLoading ? <Loader fullScreen /> : <>{children}</>;
};

export default DataWrapper;
