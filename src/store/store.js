import projectReducer from './projectSlice'

export default configureStore({
	reducer: {
		project: projectReducer
	}
})
