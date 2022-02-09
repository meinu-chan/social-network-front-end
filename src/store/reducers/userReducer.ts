import { Action } from 'redux';
import { IUser } from '../../types/User';

export interface IDefaultState
  extends Omit<IUser, 'role' | 'updatedAt' | 'createdAt' | 'password'> {
  isAuth: boolean;
  role: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export enum ReducerType {
  AUTH_USER = 'AUTH_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
  AUTH_STEP_2_USER = 'AUTH_STEP_2_USER',
}

export interface IAction extends Action<ReducerType> {
  payload: Partial<Omit<IDefaultState, 'isAuth'>> | null;
}

const defaultState: IDefaultState = {
  isAuth: false,
  email: '',
  fullName: '',
  nickname: '',
  photo: '',
  role: '',
  _id: '',
};

export const reducer = (state = defaultState, { type, payload }: IAction) => {
  switch (type) {
    case ReducerType.AUTH_USER:
      return { ...state, ...payload, isAuth: true };

    case ReducerType.LOG_OUT_USER:
      return defaultState;

    case ReducerType.AUTH_STEP_2_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};
