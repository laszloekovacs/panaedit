import React from 'react'
import EditorSidebar from '../EditorSidebar'
import Pannellum from '../Pannellum/Pannellum'

const EditorView = () => {
	return (
		<div className="flex min-h-max flex-row">
			<EditorSidebar />
			<Pannellum />
		</div>
	)
}

export default EditorView
