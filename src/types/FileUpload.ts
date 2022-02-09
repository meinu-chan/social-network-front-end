export interface IFileUploadGenerateUrlData {
  url: string;
}

export interface IFileUploadGeneratePutUrlParams {
  key: string;
  contentType: string;
  //   isPublic: boolean;
}

export interface IFileUploadGenerateGetUrlParams {
  key: string;
  //   isPublic: boolean;
}

export type FileUploadGenerateUrlResponse = Promise<IFileUploadGenerateUrlData>;
