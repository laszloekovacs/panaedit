import React, { useContext, useEffect } from 'react'
import PanoList from './PanoList'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { findPanoramaFiles } from './findPanoramaFiles'

const PanoView = () => {
	const filesMap = useContext<Map<string, string>>(FoldersContext)
	const [files, setFiles] = React.useState<string[]>([])

	useEffect(() => {
		findPanoramaFiles(filesMap, setFiles)
	}, [filesMap])

	return (
		<div>
			<PanoList items={files} />
		</div>
	)
}

export default PanoView
