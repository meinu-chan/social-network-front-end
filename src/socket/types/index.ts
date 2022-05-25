import {
  ToServerConnectionEvent,
  ToServerGlobalNotifyMessageReceiveEvent,
  ToServerIsOnlineEvent,
  ToServerJoinToRoomEvent,
  ToServerLeaveRoomEvent,
  ToServerReadMessageEvent,
  ToServerSendMessageEvent,
} from './clientEvents';
import {
  FromServerConnectionEvent,
  FromServerDisconnectionEvent,
  FromServerGlobalReceiveMessageEvent,
  FromServerReadMessageEvent,
  FromServerReceiveMessageEvent,
} from './serverEvents';

export interface IClientToServerEvent<E = string, T = any> {
  event: E;
  payload: T;
}

export interface IServerToClientsEvent<E = string, T = any> {
  event: E;
  payload: T;
}

export type ClientToServerEvent =
  | ToServerConnectionEvent
  | ToServerIsOnlineEvent
  | ToServerJoinToRoomEvent
  | ToServerLeaveRoomEvent
  | ToServerSendMessageEvent
  | ToServerReadMessageEvent
  | ToServerGlobalNotifyMessageReceiveEvent;

export type ServerToClientEvent =
  | FromServerConnectionEvent
  | FromServerDisconnectionEvent
  | FromServerReceiveMessageEvent
  | FromServerReadMessageEvent
  | FromServerGlobalReceiveMessageEvent;

export type SocketEventHandler<P> = (payload: P) => void;
