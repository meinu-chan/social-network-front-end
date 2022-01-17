import ENDPOINTS from './endpoints';
import { apiClient } from './apiClient';
import {
  FileUploadGenerateUrlResponse,
  IFileUploadGenerateGetUrlParams,
  IFileUploadGeneratePutUrlParams,
} from '../types/FileUpload';

const endpointsGetUrl = ENDPOINTS.GENERATE_GET_URL;
const endpointsPutUrl = ENDPOINTS.GENERATE_PUT_URL;

const generatePutUrl = (params: IFileUploadGeneratePutUrlParams): FileUploadGenerateUrlResponse =>
  apiClient.post(endpointsPutUrl, params).then((res) => res.data);

const generateGetUrl = (params: IFileUploadGenerateGetUrlParams): FileUploadGenerateUrlResponse =>
  apiClient.post(endpointsGetUrl, params).then((res) => res.data);

export { generatePutUrl, generateGetUrl };
