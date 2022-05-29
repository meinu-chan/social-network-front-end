import { IPost } from './Post';
import { UserData } from './User';

export interface IComment {
  _id: string;
  user: UserData['_id'];
  post: IPost['_id'];
  text: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentPayload extends Pick<IComment, 'text'> {
  postId: IPost['_id'];
}

export type CreateCommentResponse = Promise<IComment>;

export interface CommentListPayload {
  createdAt?: Date;
  limit: number;
  postId: IPost['_id'];
}

export interface CommentListItem extends Omit<IComment, 'user'> {
  user: UserData;
}

export type CommentListResponse = Promise<CommentListItem[]>;
