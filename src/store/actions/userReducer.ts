import { ReducerType, IDefaultState } from '../reducers/userReducer';

const authUser = (payload: IDefaultState) => ({
  type: ReducerType.AUTH_USER,
  payload,
});

const logOutUser = () => ({
  type: ReducerType.LOG_OUT_USER,
  payload: null,
});

export { authUser, logOutUser };
