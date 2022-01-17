import React from 'react';
import { Provider } from 'react-redux';
import DataWrapper from './app/DataWrapper';
import Layout from './app/Layout';
import SwrConfigWrapper from './app/SWRConfigWrapper';
import Theme from './app/Theme';
import Header from './components/Header';
import store from './store';

function App() {
  return (
    <SwrConfigWrapper>
      <Theme>
        <Provider store={store}>
          <Header />
          <DataWrapper>
            <Layout />
          </DataWrapper>
        </Provider>
      </Theme>
    </SwrConfigWrapper>
  );
}

export default App;
