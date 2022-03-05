import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { UserRole } from '../types/User';
import reducer from './reducer';
import { AppStateContext, IAppContext } from './types';

const initialState: AppStateContext = {
  isAuth: false,
  user: {
    _id: '',
    email: '',
    fullName: '',
    role: UserRole.user,
    nickname: '',
    photo: '',
    createdAt: '',
    updatedAt: '',
  },
  currentUser: {
    _id: '',
    email: '',
    fullName: '',
    role: UserRole.user,
    nickname: '',
    photo: '',
    createdAt: '',
    updatedAt: '',
  },
};

export const AppContext = createContext<IAppContext>({ state: initialState, dispatch: () => null });

export const useAppContext = (): IAppContext => useContext(AppContext);

interface Props {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
