import { AppStateContext, AppActions, AppActionEnums } from './types';

const reducer = (state: AppStateContext, action: AppActions): AppStateContext => {
  switch (action.type) {
    case AppActionEnums.AUTH_USER:
      return {
        ...state,
        isAuth: action.payload,
      };
    case AppActionEnums.SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case AppActionEnums.LOG_OUT_USER:
      return {
        ...state,
        isAuth: false,
      };

    default:
      return state;
  }
};

export default reducer;
