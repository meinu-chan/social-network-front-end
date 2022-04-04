import { baseURL } from '../api/apiClient';
import { ClientToServerEvent, ServerToClientEvent, SocketEventHandler } from './types';

export const emit = (data: ClientToServerEvent) => socket.send(JSON.stringify(data));

const socket = new WebSocket(`ws://${baseURL?.split('://')[1]}`);

socket.onmessage = (e: MessageEvent<string>) => {
  if (socket.readyState !== socket.OPEN) return;
  const { event, payload } = JSON.parse(e.data) as ServerToClientEvent;

  const handler = handleSocketResponse[event];

  if (handler) {
    handler(payload);
  }
};

type HandlerKeys = ServerToClientEvent['event'];

const handleSocketResponse: { [key in HandlerKeys]?: SocketEventHandler } = {};

export const addMessageHandler = (name: HandlerKeys, handler: SocketEventHandler) => {
  handleSocketResponse[name] = handler;
};

export const removeMessageHandler = (name: HandlerKeys) => {
  delete handleSocketResponse[name];
};

export const closeSocket = () => socket.close();
