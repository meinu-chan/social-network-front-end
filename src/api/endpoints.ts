const PREFIX = '/api/v1';

const ENDPOINTS = {
  SIGN_UP: `${PREFIX}/session/sign-up`,
  SIGN_IN: `${PREFIX}/session/sign-in`,
  LOG_OUT: `${PREFIX}/session/log-out`,
  REFRESH_TOKEN: `${PREFIX}/session/refresh-tokens`,

  GENERATE_GET_URL: `${PREFIX}/aws/generate-get-url`,
  GENERATE_PUT_URL: `${PREFIX}/aws/generate-put-url`,

  GET_ME: `${PREFIX}/users/me`,
  GET_USER_BY_ID: (userId: string) => `${PREFIX}/users/${userId}`,
  UPDATE_ME: `${PREFIX}/users/me`,
  NON_PAGINATED_LIST: `${PREFIX}/users/non-paginated`,

  CHAT_LIST: `${PREFIX}/chats`,

  MESSAGE_LIST: (chatId: string) => `${PREFIX}/messages/${chatId}`,
  SEND_MESSAGE: (chatId: string) => `${PREFIX}/messages/${chatId}`,
  READ_MESSAGE: (messageId: string) => `${PREFIX}/messages/${messageId}`,
};

export default ENDPOINTS;
