import { Dispatch } from 'react';
import { UserData } from '../types/User';

export interface AppStateContext {
  isAuth: boolean;
  user: UserData;
  currentUser: UserData;
}

export interface IAppContext {
  state: AppStateContext;
  dispatch: Dispatch<AppActions>;
}

export enum AppActionEnums {
  AUTH_USER = 'AUTH_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
  SET_USER_DATA = 'SET_USER_DATA',
  SET_CURRENT_USER_DATA = 'SET_CURRENT_USER_DATA',
}

interface AuthUser {
  type: AppActionEnums.AUTH_USER;
  payload: boolean;
}

interface SetUserData {
  type: AppActionEnums.SET_USER_DATA;
  payload: UserData;
}

interface SetCurrentUserData {
  type: AppActionEnums.SET_CURRENT_USER_DATA;
  payload: UserData;
}

interface LogoutUser {
  type: AppActionEnums.LOG_OUT_USER;
}

export type AppActions = AuthUser | SetUserData | LogoutUser | SetCurrentUserData;