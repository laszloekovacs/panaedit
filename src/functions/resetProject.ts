import { reset } from '../store'

export function resetProject(dispatch) {
	if (confirm('Are you sure you want to reset the project?')) {
		dispatch(reset())
	}
}
