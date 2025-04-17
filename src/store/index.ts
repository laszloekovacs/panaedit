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
	_updateHotspot,
	_AddToCache,
	_ReplaceCache,
	_SetActiveView,
	_TriggerRefresh,
	_SetPreviewReady
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
		updateHotspot: _updateHotspot,
		addToCache: _AddToCache,
		replaceCache: _ReplaceCache,
		setActiveView: _SetActiveView,
		triggerRefresh: _TriggerRefresh,
		setPreviewReady: _SetPreviewReady,
		// Floor plan actions will be added in a separate PR
		setFloorPlanImage: (state, action) => {
			if (!state.floorPlan) {
				state.floorPlan = { imagePath: '', markers: [] };
			}
			state.floorPlan.imagePath = action.payload.path;
			return state;
		},
		addFloorPlanMarker: (state, action) => {
			if (!state.floorPlan) {
				state.floorPlan = { imagePath: '', markers: [] };
			}
			state.floorPlan.markers.push(action.payload.marker);
			return state;
		},
		updateFloorPlanMarker: (state, action) => {
			if (!state.floorPlan) return state;
			
			const { id, updates } = action.payload;
			const markerIndex = state.floorPlan.markers.findIndex(marker => marker.id === id);
			
			if (markerIndex !== -1) {
				state.floorPlan.markers[markerIndex] = {
					...state.floorPlan.markers[markerIndex],
					...updates
				};
			}
			return state;
		},
		removeFloorPlanMarker: (state, action) => {
			if (!state.floorPlan) return state;
			
			const { id } = action.payload;
			state.floorPlan.markers = state.floorPlan.markers.filter(marker => marker.id !== id);
			return state;
		},
		clearFloorPlanMarkers: (state) => {
			if (!state.floorPlan) return state;
			
			state.floorPlan.markers = [];
			return state;
		}
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
	setEditorOrientation,
	addToCache,
	replaceCache,
	setActiveView,
	triggerRefresh,
	setPreviewReady,
	// Export floor plan actions
	setFloorPlanImage,
	addFloorPlanMarker,
	updateFloorPlanMarker,
	removeFloorPlanMarker,
	clearFloorPlanMarkers
} = projectSlice.actions

/* export the store */
export const store = configureStore({
	reducer: projectSlice.reducer,
	preloadedState: storeDefaults
})