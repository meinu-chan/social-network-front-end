import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as userReducer, IDefaultState as IDefaultUserState } from './reducers/userReducer';

export interface IRootReducerState {
  userReducer: IDefaultUserState;
}

const rootReducer = combineReducers({ userReducer });

export default process.env.NODE_ENV === 'development'
  ? createStore(rootReducer, composeWithDevTools())
  : createStore(rootReducer);
