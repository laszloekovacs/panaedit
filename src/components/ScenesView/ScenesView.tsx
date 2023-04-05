import React, { useContext } from 'react'
import { listAllFiles } from '../../functions'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'

const ScenesView = () => {
	const folders = useContext(FoldersContext)

	if (folders?.panoramas) {
		const files = listAllFiles(folders.panoramas)
		console.log(files)
		return <p>{files[0]}</p>
	}

	return (
		<div>
			<h2>Scenes</h2>
		</div>
	)
}

export default ScenesView
