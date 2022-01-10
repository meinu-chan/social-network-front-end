import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setApiAuthorizationHeader = (token: string): void => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export { apiClient, setApiAuthorizationHeader };
