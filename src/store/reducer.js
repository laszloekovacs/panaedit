import { createSlice } from '@reduxjs/toolkit'
import storeDefaultState from './storeDefaultState'

export const projectSlice = createSlice({
	name: 'project',
	initialState: storeDefaultState,
	reducers: {
		reset: (state) => storeDefaultState
	}
})

export default projectSlice.reducer

export const { reset } = projectSlice.actions
