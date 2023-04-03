import { createSlice } from '@reduxjs/toolkit'
import storeDefaultState from './storeDefaultState'

/* individual reducers */
import { _addScene, _removeScene, _reset, _loadProject } from './reducers'

/* 
	build the reducer 
*/
export const projectSlice = createSlice({
	name: 'project',
	initialState: storeDefaultState,
	reducers: {
		addScene: _addScene,
		removeScene: _removeScene,
		reset: _reset,
		loadProject: _loadProject
	}
})

export default projectSlice.reducer

export const { addScene, removeScene, reset, loadProject } =
	projectSlice.actions
