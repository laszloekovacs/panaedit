import React from 'react'

import Files from './Files'

import { useDispatch, useSelector } from 'react-redux'
import { loadProjectFile, saveProjectFile, resetProject } from '../../functions'

/* header container */
const Header = () => {
	const state = useSelector((s) => s)
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
			<Files onNew={onNew} onOpen={onOpen} onSave={onSave} />
		</div>
	)
}

export default Header
