export interface ValidationData {
  valid: boolean;
  param: string;
  message: string;
}

export type ValidationResponse = Promise<ValidationData>;

export interface ApiPaginationParams {
  page: number;
  limit: number;
  q?: string;
  order?: string;
  sort?: string;
  id?: string;
}

export interface ApiGetDataResponse<Item = any> {
  count: number;
  rows: Item[];
}

export interface BlobWithName extends Omit<Blob, 'name'> {
  name: string;
}

export interface SearchEnumListParams {
  q?: string;
  limit?: number;
  page?: number;
}

export interface InvalidResponseError {
  statusCode: 401;
  status: 'fail';
  isOperational: true;
  name: 'Error';
  message: 'Invalid credentials';
}

export interface InvalidResponse {
  error: InvalidResponseError;
  message: string;
  status: string;
}
