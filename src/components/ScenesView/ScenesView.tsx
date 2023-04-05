import React, { useContext, useEffect } from 'react'
import { FoldersContext } from '../FoldersProvider/FoldersProvider'
import { useState } from 'react'
import { findAllImages } from '../../functions/findAllImages'
import ScenesList from './ScenesList'

const ScenesView = () => {
	const folders = useContext(FoldersContext)
	const [files, setFiles] = useState<string[]>([])

	useEffect(() => {
		;(async () => {
			if (!folders || !folders.panoramas) {
				return
			} else {
				const images = await findAllImages(folders.panoramas)
				setFiles(images)
			}
		})()
	}, [folders])

	return (
		<div>
			<ScenesList />
		</div>
	)
}

export default ScenesView
