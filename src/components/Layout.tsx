import React from 'react'

import { useEditor } from '../hooks'

import Header from './Header'
import LayoutSelector from './LayoutSelector'
import EditorLayout from './EditorLayout'
import PhotosLayout from './PhotoLayout'
import PanoramasLayout from './PanoramasLayout'
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
			<LayoutSelector options={options} active={activeView} onChange={handleChange} />

			{activeView === 'panoramas' && <PanoramasLayout />}
			{activeView === 'editor' && <EditorLayout />}
			{activeView === 'photos' && <PhotosLayout />}
		</div>
	)
}

export default Layout
