import { IChat } from './Chat';
import { IUser } from './User';

export interface IMessage {
  _id: string;
  text: string;
  chat: IChat['_id'];
  author: Omit<IUser, 'password' | 'updatedAt' | 'createdAt'> & {
    updatedAt: string;
    createdAt: string;
  };
  readBy: IUser['_id'][];

  createdAt: Date;
  updatedAt: Date;
}

type MessageList = { [key: string]: IMessage[] };

export type MessageListResponse = Promise<MessageList>;

export type SendMessagePayload = Pick<IMessage, 'text'>;
