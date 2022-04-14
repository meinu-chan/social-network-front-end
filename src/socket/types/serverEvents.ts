import { IServerToClientsEvent } from '.';
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
