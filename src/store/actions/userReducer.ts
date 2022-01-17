import { ReducerType, IDefaultState } from '../reducers/userReducer';

type AuthUserPayload = Omit<IDefaultState, 'isAuth'>;

const authUser = (payload: AuthUserPayload) => ({
  type: ReducerType.AUTH_USER,
  payload,
});

const logOutUser = () => ({
  type: ReducerType.LOG_OUT_USER,
  payload: null,
});

export { authUser, logOutUser };
