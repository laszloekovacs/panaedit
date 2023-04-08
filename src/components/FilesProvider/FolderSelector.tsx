import React from 'react'

/*
 draws a button for the user to select a working directory
*/
const FolderSelector = ({ onClick }) => {
	return (
		<div className="flex h-screen w-screen flex-row justify-items-center">
			<div>
				<button onClick={onClick}>
					Select local working directory
				</button>
				<p>
					download example project to try out this wonderfull product
				</p>
			</div>
		</div>
	)
}

export default FolderSelector
