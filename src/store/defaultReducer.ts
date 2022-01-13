import { Action } from 'redux';

export interface IDefaultState {
  count: number;
}

export enum ReducerType {
  ADD_COUNT = 'ADD_COUNT',
  REDUCE_COUNT = 'REDUCE_COUNT',
}

export interface IAction extends Action<ReducerType> {
  payload: IDefaultState;
}

const defaultState: IDefaultState = {
  count: 0,
};

export const defaultReducer = (state = defaultState, { type, payload }: IAction) => {
  switch (type) {
    case ReducerType.ADD_COUNT:
      return { ...state, count: state.count + payload.count };

    case ReducerType.REDUCE_COUNT:
      return { ...state, count: state.count - payload.count };

    default:
      return state;
  }
};
