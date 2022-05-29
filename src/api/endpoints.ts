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
  SUBSCRIBE: (userId: string) => `${PREFIX}/users/${userId}/subscribe`,
  UNSUBSCRIBE: (userId: string) => `${PREFIX}/users/${userId}/unsubscribe`,
  COMMUNITY_LIST: (userId: string) => `${PREFIX}/users/${userId}/community`,

  CHAT_LIST: `${PREFIX}/chats`,
  CHAT_START: `${PREFIX}/chats/start`,
  CHAT_UNREAD_MESSAGES: `${PREFIX}/chats/unread-messages`,

  MESSAGE_LIST: (chatId: string) => `${PREFIX}/messages/${chatId}`,
  SEND_MESSAGE: (chatId: string) => `${PREFIX}/messages/${chatId}`,
  READ_MESSAGE: (messageId: string) => `${PREFIX}/messages/${messageId}`,

  POST_CREATE: (pageId: string) => `${PREFIX}/posts/${pageId}`,
  POST_LIST: (pageId: string) => `${PREFIX}/posts/${pageId}`,

  LIKE_LIST: (postId: string) => `${PREFIX}/likes/${postId}`,
  LIKE_SET: (postId: string) => `${PREFIX}/likes/${postId}`,

  COMMENT_CREATE: (postId: string) => `${PREFIX}/comments/${postId}`,
  COMMENT_LIST: (postId: string) => `${PREFIX}/comments/${postId}`,
};

export default ENDPOINTS;
