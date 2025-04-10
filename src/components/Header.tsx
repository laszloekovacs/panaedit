import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProjectFile, saveProjectFile, resetProject } from '../functions'

/* header container */
const Header = () => {
	const state: State = useSelector((s: State) => s)
	const dispatch = useDispatch()

	const onNew = async () => {
		resetProject(dispatch)
	}

	const onOpen = async () => {
		loadProjectFile(window, dispatch)
		console.log("Open!");
		console.log(window);
	}

	const onSave = async () => {
		console.log("SAVING!");
		console.log(state);
		saveProjectFile(state, window)
	}

	return (
		<div className="col-span-2">
			<button onClick={onNew}>New</button>
			<button onClick={onOpen}>Open</button>
			<button onClick={onSave}>Save</button>
		</div>
	)
}

export default Header
