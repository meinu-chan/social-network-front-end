import {
  FileUploadGenerateUrlResponse,
  IFileUploadGenerateGetUrlParams,
  IFileUploadGeneratePutUrlParams,
  IFileUploadGenerateUrlData,
} from '../types/FileUpload';
import { apiClient } from './apiClient';
import ENDPOINTS from './endpoints';

const endpointGenerateGetUrl = ENDPOINTS.GENERATE_GET_URL;
const endpointGeneratePutUrl = ENDPOINTS.GENERATE_PUT_URL;

const generatePutUrl = (params: IFileUploadGeneratePutUrlParams): FileUploadGenerateUrlResponse =>
  apiClient
    .post<IFileUploadGenerateUrlData>(endpointGeneratePutUrl, params)
    .then((res) => res.data);

const generateGetUrl = (params: IFileUploadGenerateGetUrlParams): FileUploadGenerateUrlResponse =>
  apiClient
    .post<IFileUploadGenerateUrlData>(endpointGenerateGetUrl, params)
    .then((res) => res.data);

export { generatePutUrl, generateGetUrl };
