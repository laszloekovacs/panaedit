import React from 'react'

import { useEditor } from '../hooks/useEditor'
import { setActiveView } from '../store'
import { useDispatch } from 'react-redux'

import Header from './Header'
import LayoutSelector from './LayoutSelector'

import EditorLayout from './EditorLayout'
import PhotosLayout from './PhotosLayout'
import PanoramasLayout from './PanoramaLayout'
import ArticleLayout from './ArticleLayout'
import MapLayout from './MapLayout'
import ArticleViewer from './ArticleViewer'

/*
 * should render the active view the header and the layout selector
 */

const Layout = () => {
	const { activeView } = useEditor()
	const dispatch = useDispatch()

	// Added 'map' to the options
	const options = ['panoramas', 'editor', 'articles', 'photos', 'map']

	const handleChange = (option) => {
		dispatch(setActiveView({ view: option }))
	}

	return (
		<div
			id="Layout"
			className="flex h-full w-full flex-col flex-nowrap justify-start px-5 py-5"
		>
			<Header />
			<LayoutSelector
				options={options}
				active={activeView}
				onChange={handleChange}
			/>

			{activeView === 'panoramas' && <PanoramasLayout />}
			{activeView === 'editor' && <EditorLayout />}
			{activeView === 'articles' && <ArticleLayout />}
			{activeView === 'photos' && <PhotosLayout />}
			{activeView === 'map' && <MapLayout />}
			
			{/* Add ArticleViewer here - it's always present but hidden until needed */}
			<ArticleViewer />
		</div>
	)
}

export default Layout