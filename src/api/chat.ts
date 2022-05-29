import {
  ChatListResponse,
  GetUnreadMessagesResponse,
  StartChatParams,
  StartChatResponse,
} from '../types/Chat';
import { apiClient } from './apiClient';
import ENDPOINTS from './endpoints';

const endpointGetChatList = ENDPOINTS.CHAT_LIST;
const endpointPostChatStart = ENDPOINTS.CHAT_START;
const endpointUnreadMessagesCount = ENDPOINTS.CHAT_UNREAD_MESSAGES;

const getChatList = (): ChatListResponse => {
  let route = endpointGetChatList;

  return apiClient.get<ChatListResponse>(route).then((res) => res.data);
};

const startChat = (payload: StartChatParams): StartChatResponse =>
  apiClient.post<StartChatResponse>(endpointPostChatStart, payload).then((res) => res.data);

const getCountOfUnreadMessage = (): GetUnreadMessagesResponse =>
  apiClient.get<GetUnreadMessagesResponse>(endpointUnreadMessagesCount).then((res) => res.data);

export { getChatList, startChat, getCountOfUnreadMessage };
