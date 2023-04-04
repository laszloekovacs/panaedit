import React from 'react'

import ErrorBoundary from './ErrorBoundary'

import ArticleList from './ArticleList'
import FileMenu from './FileMenu'

import FirstScene from './FirstScene'
import AddPanorama from './AddPanorama'
import AddArticle from './AddArticle'
import SceneEdit from './SceneEdit'
import NSceneList from './NSceneList'

import { legacy_createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from '../reducer'
import { Provider } from 'react-redux'
import { sceneChangeAction } from '../reducer/actions'

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

function App() {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<div id="sidebar">
					<FileMenu></FileMenu>
					<hr />
					<AddPanorama></AddPanorama>
					<hr />
					<FirstScene></FirstScene>
					<hr />
					<NSceneList></NSceneList>
					<SceneEdit></SceneEdit>
				</div>
				<div>
					<AddArticle />
					<hr />
					<ArticleList />
					<hr />
				</div>
			</Provider>
		</ErrorBoundary>
	)
}

export default App
