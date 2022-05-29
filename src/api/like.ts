import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';
import { LikeListResponse, LikeSetResponse } from '../types/Like';

const endpointsSetLike = ENDPOINTS.LIKE_SET;
const endpointsListLike = ENDPOINTS.LIKE_LIST;

const setLike = (post: string): LikeSetResponse =>
  apiClient.post<LikeSetResponse>(endpointsSetLike(post)).then((res) => res.data);

const likeList = (post: string): LikeListResponse =>
  apiClient.get<LikeListResponse>(endpointsListLike(post)).then((res) => res.data);

export { setLike, likeList };
