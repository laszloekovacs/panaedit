import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import PannellumContainer from '../Pannellum/Pannellum'

const EditorView = () => {
	return (
		<div className="flex min-h-max flex-row">
			<Sidebar />
			<PannellumContainer />
		</div>
	)
}

export default EditorView
