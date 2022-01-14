import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';

interface ISignUpParams {
  fullName: string;
  email: string;
  password: string;
}

interface ISignInParams {
  email: string;
  password: string;
}

const endpointSignUp = ENDPOINTS.SIGN_UP;
const endpointSignIn = ENDPOINTS.SIGN_IN;
const endpointLogOut = ENDPOINTS.LOG_OUT;

const signIn = (params: ISignInParams) =>
  apiClient.post(endpointSignIn, params).then((res) => res.data);

// const refreshToken = () =>
//   fetch(`${endpoint}/refresh-tokens`, {
//     credentials: 'include',
//     method: 'PUT',
//   }).then((res) => res.json());

const logout = () =>
  apiClient.post(endpointLogOut, undefined, { withCredentials: true }).then((res) => res.data);

const signUp = (params: ISignUpParams) =>
  apiClient.post(endpointSignUp, params).then((res) => res.data);

// eslint-disable-next-line import/no-anonymous-default-export
export default { signIn, logout, signUp };
