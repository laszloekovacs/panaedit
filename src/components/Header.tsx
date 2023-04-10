import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProjectFile, saveProjectFile, resetProject } from '../functions'

/* header container */
const Header = () => {
	const state: State = useSelector((s: State) => s)
	const dispatch = useDispatch()

	const onNew = async () => {
		console.log('new')
		resetProject(dispatch)
	}

	const onOpen = async () => {
		console.log('open')
		loadProjectFile(window, dispatch)
	}

	const onSave = async () => {
		console.log('save')
		saveProjectFile(state, window)
	}

	return (
		<div>
			<button onClick={onNew}>new</button>
			<button onClick={onOpen}>open</button>
			<button onClick={onSave}>save</button>
		</div>
	)
}

export default Header
