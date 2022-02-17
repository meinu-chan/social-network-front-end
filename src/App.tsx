import React from 'react';
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
          <Header />
          <DataWrapper>
            <Layout />
          </DataWrapper>
        </Theme>
      </AppStoreProvider>
    </SwrConfigWrapper>
  );
}

export default App;
