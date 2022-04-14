import { IMessage, MessageListResponse, SendMessagePayload } from '../types/Message';
import { apiClient } from './apiClient';
import ENDPOINTS from './endpoints';

interface IGetMessageListPayload {
  chatId: string;
  skip?: number;
}

interface ISendMessagePayload {
  chatId: string;
  payload: SendMessagePayload;
}

const endpointGetMessageList = ENDPOINTS.MESSAGE_LIST;

const getMessageList = ({ chatId, skip }: IGetMessageListPayload): MessageListResponse => {
  let route = endpointGetMessageList(chatId);

  if (skip) route += `?skip=${skip}`;

  return apiClient.get<MessageListResponse>(route).then((res) => res.data);
};

const createMessageApi = ({ chatId, payload }: ISendMessagePayload): Promise<IMessage> =>
  apiClient
    .post<IMessage>(endpointGetMessageList(chatId), payload, { withCredentials: true })
    .then((res) => res.data);

export { getMessageList, createMessageApi };
