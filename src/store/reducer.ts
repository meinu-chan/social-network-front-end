import { initialState } from '.';
import { AppStateContext, AppActions, AppActionEnums } from './types';

const reducer = (state: AppStateContext, action: AppActions): AppStateContext => {
  switch (action.type) {
    case AppActionEnums.AUTH_USER:
      return {
        ...state,
        isAuth: true,
        user: { ...state.user, ...action.payload },
      };
    case AppActionEnums.SET_USER_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case AppActionEnums.LOG_OUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
