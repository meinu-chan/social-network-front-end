import { UserData } from './User';

export interface IPost {
  _id: string;
  user: UserData['_id'];
  text: string;
  page: UserData['_id'];

  createdAt: Date;
  updatedAt: Date;
}

export interface PostCreatePayload extends Pick<IPost, 'text'> {
  page: string;
}
export type PostCreateResponse = Promise<IPost>;

export interface PostListPayload {
  createdAt?: Date;
  limit: number;
  userId: UserData['_id'];
}

export interface PostListItem extends Omit<IPost, 'user'> {
  user: UserData;
}

export type PostListResponse = Promise<PostListItem[]>;
