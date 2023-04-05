import React, { useContext, useEffect } from 'react'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { useState } from 'react'
import { findAllImages } from '../../functions/findAllImages'
import ScenesList from './ScenesList'

const ScenesView = () => {
	const folders = useContext(FoldersContext)
	const [files, setFiles] = useState<string[]>([])

	return (
		<div>
			<ScenesList items={files} />
		</div>
	)
}

export default ScenesView
