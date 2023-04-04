import React from 'react'

import Files from './Files'

import { useDispatch, useSelector } from 'react-redux'
import { loadProject, reset } from '../../store'
import { loadProjectFileDialog, saveProjectFileDialog } from '../../functions'

/* header container */
const Header = () => {
	const state = useSelector((s) => s)
	const dispatch = useDispatch()

	const onNew = () => {
		console.log('new')
		dispatch(reset())
	}

	const onOpen = async () => {
		console.log('open')
		const text = await loadProjectFileDialog()

		if (!text) {
			throw new Error('cannot open project')
		} else {
			const project = JSON.parse(text)
			dispatch(loadProject({ project }))
		}
	}

	const onSave = () => {
		console.log('save')

		const text = JSON.stringify(state, null, 2)
		saveProjectFileDialog(text)
	}

	return (
		<div>
			<Files onNew={onNew} onOpen={onOpen} onSave={onSave} />
		</div>
	)
}

export default Header
