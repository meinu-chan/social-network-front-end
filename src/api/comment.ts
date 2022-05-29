import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';
import {
  CommentListPayload,
  CommentListResponse,
  CreateCommentPayload,
  CreateCommentResponse,
} from '../types/Comment';

const endpointsCreateComment = ENDPOINTS.COMMENT_CREATE;
const endpointsListComment = ENDPOINTS.COMMENT_LIST;

const createComment = ({ postId, ...body }: CreateCommentPayload): CreateCommentResponse =>
  apiClient
    .post<CreateCommentResponse>(endpointsCreateComment(postId), body)
    .then((res) => res.data);

const commentsList = ({ postId, createdAt, limit }: CommentListPayload): CommentListResponse => {
  let route = `${endpointsListComment(postId)}?limit=${limit}`;

  if (createdAt) route += `&createdAt=${createdAt}`;

  return apiClient.get<CommentListResponse>(route).then((res) => res.data);
};

export { createComment, commentsList };
