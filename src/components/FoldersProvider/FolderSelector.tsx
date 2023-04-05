import React from 'react'

/*
 draws a button that opens a file dialog
*/
const FolderSelector = ({ onClick }) => {
	return (
		<div>
			<button type="button" onClick={onClick}>
				Select directory
			</button>
		</div>
	)
}

export default FolderSelector
