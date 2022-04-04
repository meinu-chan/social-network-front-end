import { IClientToServerEvent } from '.';
import { UserData } from '../../types/User';

type ToServerConnectionPayload = UserData['_id'];

export type ToServerConnectionEvent = IClientToServerEvent<'connect', ToServerConnectionPayload>;

type ToServerIsOnlinePayload = UserData['_id'];

export type ToServerIsOnlineEvent = IClientToServerEvent<'isOnline', ToServerIsOnlinePayload>;
