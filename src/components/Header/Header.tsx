import React from 'react'

import Files from './Files'

import { useDispatch } from 'react-redux'
import { reset } from '../../store'

/* header container */
const Header = () => {
	const dispatch = useDispatch()

	const onNew = () => {
		dispatch(reset())
	}

	const onOpen = () => {
		console.log('open')
	}

	const onSave = () => {
		console.log('save')
	}

	return (
		<div>
			<Files onNew={onNew} onOpen={onOpen} onSave={onSave} />
		</div>
	)
}

export default Header
