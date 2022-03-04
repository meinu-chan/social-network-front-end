import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import Authentication from '../containers/Authentication';
import User from '../containers/User';
import { scrollToTop } from '../helpers/common';
import NotFound from '../router/NotFound';
import PrivateRoute from '../router/PrivateRoute';
import { appLinks } from '../router/routes';
import { useAppContext } from '../store';

interface IPrivateRoute {
  path: string;
  element: JSX.Element;
}

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

const privateRoutes: IPrivateRoute[] = [];

function Layout() {
  const classes = useStyles();

  const {
    state: { isAuth },
  } = useAppContext();

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
              <Route path="/" element={<Navigate to={appLinks.auth.link} />} />
              <Route path={appLinks.auth.link} element={<Authentication />} />
              <Route path={`${appLinks.index.link}:userId`} element={<User />} />

              {privateRoutes.map(({ path, element }) => (
                <Route path={path} key={path} element={<PrivateRoute isAuthenticated={isAuth} />}>
                  <Route path={path} element={element} />
                </Route>
              ))}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </Suspense>
  );
}

export default Layout;
