import React from 'react'

const Files = ({ onNew, onOpen, onSave }) => {
	return (
		<div>
			<button onClick={onNew}>new</button>
			<button onClick={onOpen}>open</button>
			<button onClick={onSave}>save</button>
		</div>
	)
}

export default Files
