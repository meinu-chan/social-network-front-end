import { UserData } from '../types/User';
import { AppActionEnums, AppActions } from './types';

const authUser = (data: UserData): AppActions => ({
  type: AppActionEnums.AUTH_USER,
  payload: data,
});

const setUserData = (data: UserData): AppActions => ({
  type: AppActionEnums.SET_USER_DATA,
  payload: data,
});

const logOutUser = (): AppActions => ({
  type: AppActionEnums.LOG_OUT_USER,
});

export { authUser, logOutUser, setUserData };
