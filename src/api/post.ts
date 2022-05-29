import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';
import {
  PostCreatePayload,
  PostCreateResponse,
  PostListPayload,
  PostListResponse,
} from '../types/Post';

const endpointsCreatePost = ENDPOINTS.POST_CREATE;
const endpointsListPost = ENDPOINTS.POST_LIST;

const createPost = ({ page, ...body }: PostCreatePayload): PostCreateResponse =>
  apiClient.post<PostCreateResponse>(endpointsCreatePost(page), body).then((res) => res.data);

const postList = ({ userId, createdAt, limit }: PostListPayload): PostListResponse => {
  let route = `${endpointsListPost(userId)}?limit=${limit}`;

  if (createdAt) route += `&createdAt=${createdAt}`;

  return apiClient.get<PostListResponse>(route).then((res) => res.data);
};

export { createPost, postList };
