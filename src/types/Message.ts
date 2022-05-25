import { IChat } from './Chat';
import { IUser } from './User';

export interface IMessage {
  _id: string;
  text: string;
  chat: IChat['_id'];
  author: IUser['_id'];
  readBy: IUser['_id'][];

  createdAt: Date;
  updatedAt: Date;
}

export type MessageList = { firstUnreadMessage: IMessage; messages: IMessage[] };

export type MessageListResponse = Promise<MessageList>;

export type SendMessagePayload = Pick<IMessage, 'text'>;
