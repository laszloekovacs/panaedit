import ReactDOM from 'react-dom/client';
import App from './components/App';
import { legacy_createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducer from './reducer';
import { Provider } from 'react-redux';
import React from 'react';
import WorkingDirectoryProvider from './components/WorkingDirectoryProvider';

let store = legacy_createStore(reducer, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
    <WorkingDirectoryProvider>
      <App></App>
    </WorkingDirectoryProvider>
  </Provider>
);
