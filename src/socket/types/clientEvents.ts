import { IClientToServerEvent } from '.';
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
