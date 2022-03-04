import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';
import { GetUserResponse } from '../types/User';

const endpointsGetMeUrl = ENDPOINTS.GET_ME;
const endpointsGetUser = ENDPOINTS.GET_USER_BY_ID;

const getMe = (): GetUserResponse => apiClient.get(endpointsGetMeUrl).then((res) => res.data);

const getUserById = (id: string): GetUserResponse =>
  apiClient.get(endpointsGetUser(id)).then((res) => res.data);

export { getMe, getUserById };
