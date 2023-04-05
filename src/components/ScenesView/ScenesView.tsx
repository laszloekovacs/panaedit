import React, { useContext, useEffect } from 'react'
import ScenesList from './ScenesList'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { findPanoramaFiles } from './findPanoramaFiles'

const ScenesView = () => {
	const filesMap = useContext<Map<string, string>>(FoldersContext)
	const [files, setFiles] = React.useState<string[]>([])

	useEffect(() => {
		findPanoramaFiles(filesMap, setFiles)
	}, [filesMap])

	return (
		<div>
			<ScenesList items={files} />
		</div>
	)
}

export default ScenesView
