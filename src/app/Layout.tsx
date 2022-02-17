import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import Authentication from '../containers/Authentication';
import Home from '../containers/Home';
import { scrollToTop } from '../helpers/common';
import NotFound from '../router/NotFound';
import PrivateRoute from '../router/PrivateRoute';
import { appLinks } from '../router/routes';
import { useAppContext } from '../store';

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

const privateRoutes = [{ path: appLinks.index.link, element: <Home /> }];

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
              <Route path={appLinks.auth.link} element={<Authentication />} />

              {privateRoutes.map(({ path, element }) => (
                <Route path={path} element={<PrivateRoute isAuthenticated={isAuth} />}>
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
