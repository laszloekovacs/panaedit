import React from 'react'

/*
 draws a button that opens a file dialog
*/

const FolderSelector = ({ onClick }) => {
	return (
		<div>
			<button onClick={onClick}>select directory</button>
		</div>
	)
}

export default FolderSelector
