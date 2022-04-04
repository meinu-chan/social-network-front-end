import { IServerToClientsEvent } from '.';
import { UserData } from '../../types/User';

type FromServerConnectionPayload = UserData['_id'];

export type FromServerConnectionEvent = IServerToClientsEvent<
  'online',
  FromServerConnectionPayload
>;

type FromServerDisconnectionPayload = UserData['_id'];

export type FromServerDisconnectionEvent = IServerToClientsEvent<
  'disconnect',
  FromServerDisconnectionPayload
>;
