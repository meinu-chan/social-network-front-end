import {
  ToServerConnectionEvent,
  ToServerIsOnlineEvent,
  ToServerJoinToRoomEvent,
  ToServerLeaveRoomEvent,
  ToServerReadMessageEvent,
  ToServerSendMessageEvent,
} from './clientEvents';
import {
  FromServerConnectionEvent,
  FromServerDisconnectionEvent,
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
  | ToServerReadMessageEvent;

export type ServerToClientEvent =
  | FromServerConnectionEvent
  | FromServerDisconnectionEvent
  | FromServerReceiveMessageEvent
  | FromServerReadMessageEvent;

export type SocketEventHandler<P> = (payload: P) => void;
