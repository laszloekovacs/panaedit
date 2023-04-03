import { createSlice } from '@reduxjs/toolkit'
import storeDefaultState from './storeDefaultState'

/* individual reducers */
import { addSceneReducer, resetReducer } from './reducers/scene'

/* create slice */
export const projectSlice = createSlice({
	name: 'project',
	initialState: storeDefaultState,
	reducers: {
		reset: resetReducer(state),
		addScene: addSceneReducer(state, action)
	}
})

export default projectSlice.reducer

export const { reset, addScene } = projectSlice.actions
