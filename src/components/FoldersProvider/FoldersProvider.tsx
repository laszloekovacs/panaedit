import React from 'react'
import FolderSelector from './FolderSelector'
import { openWorkFiles } from './openWorkFiles'

export const FoldersContext = React.createContext(new Map<string, string>())

/* 
	After opening the work folder, store all files including subfolders in a js Map
	with the original path in the key, and an object url as the value.
	later on, we just need to fiter out the files we need 
*/
const FoldersProvider = ({ children, directories }) => {
	const [filesMap, setFilesMap] = React.useState(new Map<string, string>())

	const handleClick = async () => {
		await openWorkFiles(window, setFilesMap, directories)
	}

	// return directory selector if not set
	if (filesMap.size == 0) {
		return <FolderSelector onClick={handleClick} />
	} else {
		return (
			<FoldersContext.Provider value={filesMap}>
				{children}
			</FoldersContext.Provider>
		)
	}
}

export default FoldersProvider
