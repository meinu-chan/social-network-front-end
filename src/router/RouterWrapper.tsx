import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader';
import { appLinks } from './routes';
import NotFound from './NotFound';
import Authentication from '../containers/Authentication';
import Header from '../components/Header';
import SignUpStep2 from '../containers/Authentication/SignUpStep2';
import Home from '../containers/Home';

function RouterWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={appLinks.auth.link} element={<Authentication />} />
          <Route path={appLinks.signUp2.link} element={<SignUpStep2 />} />
          <Route path={appLinks.index.link} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default RouterWrapper;
