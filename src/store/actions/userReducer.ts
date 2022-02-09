import { ReducerType, IDefaultState } from '../reducers/userReducer';

type AuthUserPayload = Omit<IDefaultState, 'isAuth'>;
type AuthUserStep2Payload = Pick<IDefaultState, 'nickname' | 'photo'>;

const authUser = (payload: AuthUserPayload) => ({
  type: ReducerType.AUTH_USER,
  payload,
});

const logOutUser = () => ({
  type: ReducerType.LOG_OUT_USER,
  payload: null,
});

const authUserStep2 = (payload: AuthUserStep2Payload) => ({
  type: ReducerType.AUTH_STEP_2_USER,
  payload,
});

export { authUser, logOutUser, authUserStep2 };
