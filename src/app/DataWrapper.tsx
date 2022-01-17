import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  createApiClientRequestInterceptor,
  createApiClientResponseInterceptor,
  setApiAuthorizationHeader,
} from '../api/apiClient';
import authApi from '../api/authApi';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { authUser, logOutUser } from '../store/actions/userReducer';
import userApi from '../api/userApi';

interface IProps {
  children: React.ReactNode;
}

const DataWrapper = ({ children }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = useCallback(async () => {
    try {
      const { accessToken } = await authApi.refreshToken();
      if (accessToken) {
        setApiAuthorizationHeader(accessToken);
        createApiClientRequestInterceptor(() => dispatch(logOutUser()));
        createApiClientResponseInterceptor(() => dispatch(logOutUser()));

        const res = await userApi.getMe();

        authUser(res);
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
