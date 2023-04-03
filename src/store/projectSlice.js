import { createReducer, createSlice } from '@reduxjs/toolkit'

export const projectSlice = createSlice({
	name: 'project',
	initialState: {},
	reducers: {
		test: (state) => state
	}
})

export default projectSlice.reducer

export const { test } = projectSlice.actions
