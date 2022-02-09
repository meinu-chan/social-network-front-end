import { IUser } from './User';

export interface IParsedJwtToken {
  exp: number;
  iat: number;
  id: string;
}

export interface IAuthLoginParams {
  email: string;
  password: string;
}

export interface IAuthSignUpParams {
  fullName: string;
  email: string;
  password: string;
}
export interface IAuthSignUpStep2Params {
  photo?: string;
  nickname?: string;
}

export interface IAuthData {
  accessToken: string;
  user: IUser;
}

export interface IAuthRefreshTokenData {
  accessToken: string;
}

export type AuthLoginResponse = Promise<IAuthData>;

export type AuthRefreshTokenResponse = Promise<IAuthRefreshTokenData>;

export type AuthLogOutResponse = Promise<void>;

export type AuthSignUpResponse = Promise<IAuthData>;
