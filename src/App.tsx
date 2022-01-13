import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import RouterWrapper from './router/RouterWrapper';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <RouterWrapper />
    </Provider>
  );
}

export default App;
