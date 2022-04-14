import { IMessage } from './Message';
import { IUser } from './User';

export interface IChat {
  _id: string;
  isPrivate: boolean;
  members: IUser['_id'][];
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatListItem extends Omit<IChat, 'members'> {
  members: IUser[];
  unread: number;
  lastMessage: IMessage;
}

export type ChatListResponse = Promise<IChatListItem[]>;
