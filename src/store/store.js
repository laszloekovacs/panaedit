import projectReducer from './reducer'

export default configureStore({
	reducer: {
		project: projectReducer
	}
})
