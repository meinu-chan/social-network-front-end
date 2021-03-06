import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  baseURL,
  createApiClientRequestInterceptor,
  createApiClientResponseInterceptor,
  setApiAuthorizationHeader,
} from '../api/apiClient';
import { refreshToken } from '../api/authApi';
import Loader from '../components/Loader';
import { getMe } from '../api/userApi';
import { useAppContext } from '../store';
import { logOutUser, authUser } from '../store/actions';
import ENDPOINTS from '../api/endpoints';

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

        dispatch(authUser(res));

        window.onbeforeunload = (e) => {
          const headers = new Blob([JSON.stringify({ accessToken })], {
            type: 'application/json',
          });
          navigator.sendBeacon(`${baseURL}${ENDPOINTS.OFFLINE}`, headers);
        };
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
