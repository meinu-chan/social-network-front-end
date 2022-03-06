import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DataWrapper from './app/DataWrapper';
import Layout from './app/Layout';
import SwrConfigWrapper from './app/SWRConfigWrapper';
import Theme from './app/Theme';
import Header from './components/Header';
import { AppStoreProvider } from './store';

function App() {
  return (
    <SwrConfigWrapper>
      <AppStoreProvider>
        <Theme>
          <BrowserRouter>
            <Header />
            <DataWrapper>
              <Layout />
            </DataWrapper>
          </BrowserRouter>
        </Theme>
      </AppStoreProvider>
    </SwrConfigWrapper>
  );
}

export default App;
