import ReactDOM from 'react-dom/client';
import App from './components/App';
import { legacy_createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducer from './reducer';
import { Provider } from 'react-redux';
import React from 'react';
import { sceneChangeAction } from './reducer/actions';
import WorkingDirectorySelector from './components/WorkingDirectorySelector';

let store = legacy_createStore(reducer, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById('root'));

/* save the current scene to the store */
function loadHandler(e) {
  store.dispatch(sceneChangeAction(window.panorama.getScene()));
}

/* create panorama, wont be controlled by react */
window.resetPanorama = function resetPanorama() {
  window?.panorama?.destroy();

  window.panorama = window.pannellum.viewer('out', store.getState());

  window.panorama.on('load', loadHandler);
};

root.render(
  <Provider store={store}>
    <WorkingDirectorySelector>
      <App></App>
    </WorkingDirectorySelector>
  </Provider>
);
