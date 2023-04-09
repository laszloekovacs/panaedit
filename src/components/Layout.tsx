import React from 'react'

import Header from './Header/Header'
import TabSelector from './TabSelector'
import PanoramasView from './PanoView/PanoView'
import EditorView from './EditorView/EditorView'
import PhotoView from './PhotoView/PhotoView'
import { useEditor } from '../hooks'

/* should render the header, sidebar, status bar and the tabs selector 
	the tabs decide what to render in main, and sidebar 
*/

const Layout = () => {
	const { activeView } = useEditor()

	const options = ['panoramas', 'editor', 'photos']

	const handleChange = (option) => {
		console.log(option)
	}

	return (
		<div>
			<Header />
			<TabSelector
				options={options}
				active={activeView}
				onChange={handleChange}
			/>
		</div>
		/*
			{activeView === 'panoramas' && <PanoramasView />}
			{activeView === 'editor' && <EditorView />}
			{activeView === 'photos' && <PhotoView />}
*/
	)
}

export default Layout
