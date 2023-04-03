import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './reducer'
import storeDefaultState from './storeDefaultState'

export default configureStore({
	reducer: projectReducer,
	preloadedState: storeDefaultState
})
