import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';
import { GetUserResponse, UpdateUserParams } from '../types/User';

const endpointsGetMeUrl = ENDPOINTS.GET_ME;
const endpointsUpdateMeUrl = ENDPOINTS.UPDATE_ME;
const endpointsGetUser = ENDPOINTS.GET_USER_BY_ID;

const getMe = (): GetUserResponse => apiClient.get(endpointsGetMeUrl).then((res) => res.data);

const getUserById = (id: string): GetUserResponse =>
  apiClient.get(endpointsGetUser(id)).then((res) => res.data);

const updateMe = (body: UpdateUserParams): GetUserResponse =>
  apiClient.put(endpointsUpdateMeUrl, body).then((res) => res.data);

export { getMe, getUserById, updateMe };
