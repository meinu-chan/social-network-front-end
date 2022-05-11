import { IServerToClientsEvent } from '.';
import { IMessage } from '../../types/Message';
import { UserData } from '../../types/User';

type FromServerConnectionPayload = UserData['_id'];

export type FromServerConnectionEvent = IServerToClientsEvent<
  'USER::ONLINE',
  FromServerConnectionPayload
>;

type FromServerDisconnectionPayload = UserData['_id'];

export type FromServerDisconnectionEvent = IServerToClientsEvent<
  'USER::DISCONNECT',
  FromServerDisconnectionPayload
>;

type FromServerReceiveMessagePayload = IMessage;

export type FromServerReceiveMessageEvent = IServerToClientsEvent<
  'CHAT::RECEIVE',
  FromServerReceiveMessagePayload
>;

type FromServerReadMessagePayload = IMessage;

export type FromServerReadMessageEvent = IServerToClientsEvent<
  'MESSAGE::READ',
  FromServerReadMessagePayload
>;
