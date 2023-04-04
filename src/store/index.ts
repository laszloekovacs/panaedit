import { configureStore, createSlice } from '@reduxjs/toolkit'
import storeDefaultState from './storeDefaultState'

/* individual actions */
import {
	_addArticle,
	_removeArticle,
	_setActiveScene,
	_addHotspot,
	_removeHotspot,
	_addPhoto,
	_removePhoto,
	_setPhotoLabel,
	_reset,
	_loadProject,
	_setFirstScene,
	_addScene,
	_removeScene,
	_setSceneTitle,
	_setSceneNorthOffset
} from './actions'

/* 
	build the reducer 
*/
const projectSlice = createSlice({
	name: 'project',
	initialState: storeDefaultState,
	reducers: {
		addArticle: _addArticle,
		removeArticle: _removeArticle,
		setActiveScene: _setActiveScene,
		addHotspot: _addHotspot,
		removeHotspot: _removeHotspot,
		addPhoto: _addPhoto,
		removePhoto: _removePhoto,
		setPhotoLabel: _setPhotoLabel,
		reset: _reset,
		loadProject: _loadProject,
		setFirstScene: _setFirstScene,
		addScene: _addScene,
		removeScene: _removeScene,
		setSceneTitle: _setSceneTitle,
		setSceneNorthOffset: _setSceneNorthOffset
	}
})

/* export actions */
export const {
	addArticle,
	removeArticle,
	setActiveScene,
	addHotspot,
	removeHotspot,
	addPhoto,
	removePhoto,
	setPhotoLabel,
	reset,
	loadProject,
	setFirstScene,
	addScene,
	removeScene,
	setSceneTitle,
	setSceneNorthOffset
} = projectSlice.actions

/* export the store */
export const store = configureStore({
	reducer: projectSlice.reducer,
	preloadedState: storeDefaultState
})