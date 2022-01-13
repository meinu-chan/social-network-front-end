import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { defaultReducer, IDefaultState } from './defaultReducer';

export interface IRootReducerState {
  defaultReducer: IDefaultState;
}

const rootReducer = combineReducers({ defaultReducer });

export default process.env.NODE_ENV === 'development'
  ? createStore(rootReducer, composeWithDevTools())
  : createStore(rootReducer);
