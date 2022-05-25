import { ChatListResponse } from '../types/Chat';
import { apiClient } from './apiClient';
import ENDPOINTS from './endpoints';

const endpointGetChatList = ENDPOINTS.CHAT_LIST;

const getChatList = (): ChatListResponse => {
  let route = endpointGetChatList;

  return apiClient.get<ChatListResponse>(route).then((res) => res.data);
};

export { getChatList };
