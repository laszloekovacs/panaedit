import React from 'react'
import FolderSelector from './FolderSelector'
import { openWorkFiles } from './openWorkFiles'
import { useDispatch, useSelector } from 'react-redux'
import { replaceCache } from '../../store'
import _ from 'lodash'

/* 
	After opening the work folder, store all files including subfolders in a js Map
	with the original path in the key, and an object url as the value.
	later on, we just need to fiter out the files we need 
*/
const _directories = ['panoramas', 'articles', 'photos']

const FilesProvider = ({ children, directories = _directories }) => {
	const dispatch = useDispatch()
	const cache = useSelector((state: State) => state.cache)

	const onClick = async () => {
		const map = await openWorkFiles(directories)

		dispatch(replaceCache({ map }))
	}

	console.log(cache.length)

	if (!cache || cache.length == 0) {
		return <FolderSelector onClick={onClick} />
	} else {
		return <>{children}</>
	}
}

export default FilesProvider
