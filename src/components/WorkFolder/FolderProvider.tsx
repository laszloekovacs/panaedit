import React, { Context } from 'react'

declare interface Folders {
	project: FileSystemDirectoryHandle | null
	// photo, panorama, article,
}

export const FolderContext = React.createContext<Folders | null>(null)

/* 
	Wrapper for providing directory handles. 
	It should block the user and the rest of the app to have to deal with 
	null pointers and unopened directories.
*/
const FoldersProvider = ({ children }) => {
	const [folders, setFolders] = React.useState<Folders | null>(null)

	// return directory selector if not set
	if (!folders) {
		return <p>hello</p>
	} else {
		return <FolderContext.Provider value={folders}>{children}</FolderContext.Provider>
	}
}

export default FoldersProvider
