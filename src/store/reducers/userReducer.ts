import { Action } from 'redux';

export interface IDefaultState {
  isAuth?: boolean;
  email: string;
  fullName: string;
  role: string;
  updatedAt: string;
  _id: string;
}

export enum ReducerType {
  AUTH_USER = 'AUTH_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
}

export interface IAction extends Action<ReducerType> {
  payload: IDefaultState | null;
}

const defaultState: IDefaultState = {
  isAuth: false,
  email: '',
  fullName: '',
  role: '',
  updatedAt: '',
  _id: '',
};

export const reducer = (state = defaultState, { type, payload }: IAction) => {
  switch (type) {
    case ReducerType.AUTH_USER:
      return { ...state, ...payload, isAuth: true };

    case ReducerType.LOG_OUT_USER:
      return defaultState;

    default:
      return state;
  }
};
