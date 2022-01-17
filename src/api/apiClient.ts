import axios, { AxiosInstance } from 'axios';
import ENDPOINTS from './endpoints';

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setApiAuthorizationHeader = (token: string): void => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const createApiClientResponseInterceptor = (on401Error: () => void) => {
  const interceptor = apiClient.interceptors.response.use(
    (value) => value,
    (error) => {
      if (error.response && error.response.status === 401) {
        on401Error();

        return Promise.reject(error);
      }

      apiClient.interceptors.response.eject(interceptor);

      return Promise.reject(error);
    }
  );
};

const createApiClientRequestInterceptor = (callbackOnError: () => void) => {
  const interceptorId = apiClient.interceptors.request.use(
    async (value) => {
      if (value.url === ENDPOINTS.LOG_OUT) {
        apiClient.interceptors.request.eject(interceptorId);
      }

      // if (value.url !== `${ENDPOINTS.GCS}/generate-get-url`) {
      //   const parsedToken = parseJwtToken(
      //     value.headers.Authorization && value.headers.Authorization.split(' ')[1]
      //   );
      //   if (parsedToken) {
      //     const expDate = new Date(parsedToken.exp * 1000);

      //     if (expDate < new Date()) {
      //       await authApi
      //         .refreshToken()
      //         .then((res) => {
      //           setApiAuthorizationHeader(res.accessToken);
      //           // eslint-disable-next-line no-param-reassign
      //           value.headers.Authorization = `Bearer ${res.accessToken}`;

      //           return value;
      //         })
      //         .catch((error) => {
      //           if (error.response.status === 404) {
      //             callbackOnError();
      //           }
      //         });
      //     }
      //   }
      // }

      return value;
    },
    (error) => Promise.reject(error)
  );
};

export {
  apiClient,
  setApiAuthorizationHeader,
  createApiClientResponseInterceptor,
  createApiClientRequestInterceptor,
};
