import { IMessage, MessageListResponse, SendMessagePayload } from '../types/Message';
import { apiClient } from './apiClient';
import ENDPOINTS from './endpoints';

interface IGetMessageListPayload {
  chatId: string;
  date?: Date;
  operator?: '+' | '-';
}

interface ISendMessagePayload {
  chatId: string;
  payload: SendMessagePayload;
}

const endpointGetMessageList = ENDPOINTS.MESSAGE_LIST;

const getMessageList = ({
  chatId,
  date,
  operator,
}: IGetMessageListPayload): MessageListResponse => {
  let route = endpointGetMessageList(chatId);

  return apiClient
    .get<MessageListResponse>(route, { params: { date, operator } })
    .then((res) => res.data);
};

const createMessageApi = ({ chatId, payload }: ISendMessagePayload): Promise<IMessage> =>
  apiClient
    .post<IMessage>(endpointGetMessageList(chatId), payload, { withCredentials: true })
    .then((res) => res.data);

const readMessage = (messageId: string): Promise<IMessage> =>
  apiClient
    .patch<IMessage>(endpointGetMessageList(messageId), {}, { withCredentials: true })
    .then((res) => res.data);

export { getMessageList, createMessageApi, readMessage };
