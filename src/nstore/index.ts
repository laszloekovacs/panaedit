import { configureStore } from '@reduxjs/toolkit'
import storeDefaults from '../store/storeDefaultState'
import { reduceReducers } from '../../utils/reduce-reducer'
import cacheReducer from './cacheReducer'

const combinedReducers = reduceReducers(cacheReducer)

const store = configureStore({
	reducer: combinedReducers,
	preloadedState: storeDefaults
})

export default store
