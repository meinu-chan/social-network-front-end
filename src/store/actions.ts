import { UserData } from '../types/User';
import { AppActionEnums, AppActions } from './types';

const authUser = (isAuth: boolean): AppActions => ({
  type: AppActionEnums.AUTH_USER,
  payload: isAuth,
});

const setUserData = (data: UserData): AppActions => ({
  type: AppActionEnums.SET_USER_DATA,
  payload: data,
});

const setCurrentUserData = (data: UserData): AppActions => ({
  type: AppActionEnums.SET_CURRENT_USER_DATA,
  payload: data,
});

const logOutUser = (): AppActions => ({
  type: AppActionEnums.LOG_OUT_USER,
});

export { authUser, logOutUser, setUserData, setCurrentUserData };
