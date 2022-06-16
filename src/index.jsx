import ReactDOM from 'react-dom/client';
import App from './components/App';
import { legacy_createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducer from './reducer';
import { Provider } from 'react-redux';
import React from 'react';
import { sceneChangeAction } from './reducer/actions'

let store = legacy_createStore(reducer, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById('root'));

/* send the current scene trough the store */
function sceneChange() {
	store.dispatch(sceneChangeAction(window.panorama.getScene()));
}

/* create panorama, wont be controlled by react */
window.resetPanorama = function resetPanorama() {
	window?.panorama?.destroy();

	window.panorama = window.pannellum.viewer('out', store.getState());

	window.panorama.on('load', sceneChange);
};

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App></App>
		</Provider>
	</React.StrictMode>
);
