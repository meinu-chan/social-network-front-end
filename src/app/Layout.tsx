import { Home } from '@mui/icons-material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import Authentication from '../containers/Authentication';
import SignUpStep2 from '../containers/Authentication/SignUpStep2';
import { scrollToTop } from '../helpers/common';
import NotFound from '../router/NotFound';
import PrivateRoute from '../router/PrivateRoute';
import { appLinks } from '../router/routes';
import { IRootReducerState } from '../store';
import { IDefaultState as IUserState } from '../store/reducers/userReducer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Layout() {
  const classes = useStyles();
  const { isAuth } = useSelector<IRootReducerState, IUserState>(({ userReducer }) => userReducer);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <BrowserRouter>
            <Routes>
              <Route path={appLinks.auth.link} element={<Authentication />} />
              <Route path={appLinks.index.link} element={<Home />} />

              <Route
                path={appLinks.signUp2.link}
                element={<PrivateRoute isAuthenticated={isAuth} />}
              >
                <Route path={appLinks.signUp2.link} element={<SignUpStep2 />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </Suspense>
  );
}

export default Layout;
