import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'

import { legacy_createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from './reducer'
import { Provider } from 'react-redux'
import { sceneChangeAction } from './reducer/actions'
import './index.css'

let store = legacy_createStore(reducer, devToolsEnhancer())

/* save the current scene to the store */
function loadHandler(e) {
	store.dispatch(sceneChangeAction(window.panorama.getScene()))
}

/* create panorama, wont be controlled by react */
window.resetPanorama = function resetPanorama() {
	window?.panorama?.destroy()

	window.panorama = window.pannellum.viewer('out', store.getState())

	window.panorama.on('load', loadHandler)
}

/* react enrty point */
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<Provider store={store}>
		<App></App>
	</Provider>
)
