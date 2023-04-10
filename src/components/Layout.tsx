import React from 'react'

import { useEditor } from '../hooks'

import Header from './Header/Header'
import TabSelector from './LayoutSelector'
import EditorView from './EditorView/EditorView'
import PhotoView from './PhotoView/PhotoView'
import PanoramaView from './PanoramaView/panoramaView'
import { setActiveView } from '../store'
import { useDispatch } from 'react-redux'

/* should render the header, sidebar, status bar and the tabs selector 
	the tabs decide what to render in main, and sidebar 
*/

const Layout = () => {
	const { activeView } = useEditor()
	const dispatch = useDispatch()

	const options = ['panoramas', 'editor', 'photos']

	const handleChange = (option) => {
		dispatch(setActiveView({ view: option }))
	}

	return (
		<div>
			<Header />
			<TabSelector options={options} active={activeView} onChange={handleChange} />

			{activeView === 'panoramas' && <PanoramaView />}
			{activeView === 'editor' && <EditorView />}
			{activeView === 'photos' && <PhotoView />}
		</div>
	)
}

export default Layout
