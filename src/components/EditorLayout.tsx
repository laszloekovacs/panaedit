import React from 'react'
import EditorSidebar from './EditorSidebar'
import Pannellum from './PreviewContainer'

const EditorLayout = () => {
	return (
		<div className="flex min-h-max flex-row">
			<EditorSidebar />
			<Pannellum />
		</div>
	)
}

export default EditorLayout
