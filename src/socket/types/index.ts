import { ToServerConnectionEvent, ToServerIsOnlineEvent } from './clientEvents';
import { FromServerConnectionEvent, FromServerDisconnectionEvent } from './serverEvents';

export interface IClientToServerEvent<E = string, T = any> {
  event: E;
  payload: T;
}

export interface IServerToClientsEvent<E = string, T = any> {
  event: E;
  payload: T;
}

export type ClientToServerEvent = ToServerConnectionEvent | ToServerIsOnlineEvent;
export type ServerToClientEvent = FromServerConnectionEvent | FromServerDisconnectionEvent;

export type SocketEventHandler = (payload: ServerToClientEvent['payload']) => void;
