import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';
import { UserGetMeResponse } from '../types/User';

const endpointsGetMeUrl = ENDPOINTS.GET_ME;

const getMe = (): UserGetMeResponse => apiClient.get(endpointsGetMeUrl).then((res) => res.data);

export { getMe };
