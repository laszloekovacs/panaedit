import { configureStore, createSlice } from '@reduxjs/toolkit'
import storeDefaults from './storeDefaultState'

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
	_setSceneNorthOffset,
	_SetEditorOrientation,
	_updateHotspot
} from './actions'

/* 
	build the reducer 
*/
const projectSlice = createSlice({
	name: 'project',
	initialState: storeDefaults,
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
		setSceneNorthOffset: _setSceneNorthOffset,
		setEditorOrientation: _SetEditorOrientation,
		updateHotspot: _updateHotspot
	}
})

/* export actions */
export const {
	addArticle,
	removeArticle,
	setActiveScene,
	addHotspot,
	removeHotspot,
	updateHotspot,
	addPhoto,
	removePhoto,
	setPhotoLabel,
	reset,
	loadProject,
	setFirstScene,
	addScene,
	removeScene,
	setSceneTitle,
	setSceneNorthOffset,
	setEditorOrientation
} = projectSlice.actions

/* export the store */
export const store = configureStore({
	reducer: projectSlice.reducer,
	preloadedState: storeDefaults
})
