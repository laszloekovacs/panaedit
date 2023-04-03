import { createSlice } from '@reduxjs/toolkit'
import storeDefaultState from './storeDefaultState'

/* individual reducers */
import { _addScene, _reset } from './reducers/scene'

/* create slice */
export const projectSlice = createSlice({
	name: 'project',
	initialState: storeDefaultState,
	reducers: {
		reset: _reset,
		addScene: _addScene
	}
})

export default projectSlice.reducer

export const { reset, addScene } = projectSlice.actions
