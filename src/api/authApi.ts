import ENDPOINTS from './endpoints';
import { apiClient, baseURL } from './apiClient';
import {
  IAuthLoginParams,
  AuthLogOutResponse,
  AuthRefreshTokenResponse,
  IAuthSignUpParams,
} from '../types/Auth';

const endpointSignUp = ENDPOINTS.SIGN_UP;
const endpointSignIn = ENDPOINTS.SIGN_IN;
const endpointLogOut = ENDPOINTS.LOG_OUT;
const endpointRefreshToken = ENDPOINTS.REFRESH_TOKEN;

const signIn = (params: IAuthLoginParams) =>
  apiClient.post(endpointSignIn, params, { withCredentials: true }).then((res) => res.data);

const refreshToken = (): AuthRefreshTokenResponse =>
  fetch(`${baseURL}${endpointRefreshToken}`, {
    credentials: 'include',
    method: 'PUT',
  }).then((res) => res.json());

const logout = (): AuthLogOutResponse =>
  apiClient.post(endpointLogOut, undefined, { withCredentials: true }).then((res) => res.data);

const signUp = (params: IAuthSignUpParams) =>
  apiClient.post(endpointSignUp, params, { withCredentials: true }).then((res) => res.data);

const api = {
  signIn,
  refreshToken,
  logout,
  signUp,
};

export default api;
