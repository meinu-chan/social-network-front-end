import { IClientToServerEvent } from '.';
import { IChat } from '../../types/Chat';
import { IMessage } from '../../types/Message';
import { UserData } from '../../types/User';

type ToServerConnectionPayload = UserData['_id'];

export type ToServerConnectionEvent = IClientToServerEvent<
  'USER::CONNECT',
  ToServerConnectionPayload
>;

type ToServerIsOnlinePayload = UserData['_id'];

export type ToServerIsOnlineEvent = IClientToServerEvent<
  'USER::IS_ONLINE',
  ToServerIsOnlinePayload
>;

type ToServerJoinToRoomPayload = IChat['_id'];

export type ToServerJoinToRoomEvent = IClientToServerEvent<'CHAT::JOIN', ToServerJoinToRoomPayload>;

type ToServerSendMessagePayload = { chat: IChat['_id']; message: IMessage };

export type ToServerSendMessageEvent = IClientToServerEvent<
  'CHAT::SEND',
  ToServerSendMessagePayload
>;

type ToServerLeaveRoomPayload = IChat['_id'];

export type ToServerLeaveRoomEvent = IClientToServerEvent<'CHAT::LEAVE', ToServerLeaveRoomPayload>;

type ToServerReadMessagePayload = { chat: IChat['_id']; message: IMessage };

export type ToServerReadMessageEvent = IClientToServerEvent<
  'MESSAGE::READ',
  ToServerReadMessagePayload
>;
