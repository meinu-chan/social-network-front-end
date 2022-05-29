import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';
import {
  GetCommunityPayload,
  GetCommunityResponse,
  GetNonPaginatedUsersResponse,
  GetUserResponse,
  UpdateUserParams,
} from '../types/User';

const endpointsGetMeUrl = ENDPOINTS.GET_ME;
const endpointsUpdateMeUrl = ENDPOINTS.UPDATE_ME;
const endpointsGetUser = ENDPOINTS.GET_USER_BY_ID;
const endpointsNonPaginatedList = ENDPOINTS.NON_PAGINATED_LIST;
const endpointsSubscribe = ENDPOINTS.SUBSCRIBE;
const endpointsUnsubscribe = ENDPOINTS.UNSUBSCRIBE;
const endpointsGetCommunity = ENDPOINTS.COMMUNITY_LIST;

const getMe = (): GetUserResponse => apiClient.get(endpointsGetMeUrl).then((res) => res.data);

const getUserById = (id: string): GetUserResponse =>
  apiClient.get(endpointsGetUser(id)).then((res) => res.data);

const updateMe = (body: UpdateUserParams): GetUserResponse =>
  apiClient.put(endpointsUpdateMeUrl, body).then((res) => res.data);

const getUserNonPaginatedUserList = (field: string): GetNonPaginatedUsersResponse =>
  apiClient.get(endpointsNonPaginatedList, { params: { field } }).then((res) => res.data);

const subscribeOnUser = async (userId: string): Promise<void> =>
  apiClient.patch(endpointsSubscribe(userId)).then((res) => res.data);

const unsubscribeOnUser = async (userId: string): Promise<void> =>
  apiClient.patch(endpointsUnsubscribe(userId)).then((res) => res.data);

//@ts-ignore
const communityList = async ({ userId, type }: GetCommunityPayload): GetCommunityResponse => {
  const route = `${endpointsGetCommunity(userId)}?type=${type}`;

  return apiClient.get<GetCommunityResponse>(route).then((res) => res.data);
};

export {
  getMe,
  getUserById,
  updateMe,
  getUserNonPaginatedUserList,
  subscribeOnUser,
  unsubscribeOnUser,
  communityList,
};
