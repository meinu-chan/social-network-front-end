import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Theme from './app/Theme';
import RouterWrapper from './router/RouterWrapper';
import store from './store';

function App() {
  return (
    <Theme>
      <Provider store={store}>
        <RouterWrapper />
      </Provider>
    </Theme>
  );
}

export default App;
