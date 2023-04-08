import React from 'react'
import Sidebar from '../SidebarB/Sidebar'
import Pannellum from '../Pannellum/Pannellum'

const EditorView = () => {
	return (
		<div className="flex min-h-max flex-row">
			<Sidebar />
			<Pannellum />
		</div>
	)
}

export default EditorView
