import React from 'react';
import { Provider } from 'react-redux';
import DataWrapper from './app/DataWrapper';
import Layout from './app/Layout';
import Theme from './app/Theme';
import Header from './components/Header';
import store from './store';

function App() {
  return (
    <Theme>
      <Provider store={store}>
        <Header />
        <DataWrapper>
          <Layout />
        </DataWrapper>
      </Provider>
    </Theme>
  );
}

export default App;
