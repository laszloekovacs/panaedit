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

/*
 * should render the active view the header and the layout selector
 */

const Layout = () => {
	const { activeView } = useEditor()
	const dispatch = useDispatch()

	const options = ['panoramas', 'editor', 'articles', 'photos']

	const handleChange = (option) => {
		dispatch(setActiveView({ view: option }))
	}

	return (
		<div id="Layout" className="h-full mx-7 py-4">
			<Header />
			<LayoutSelector options={options} active={activeView} onChange={handleChange} />

			{activeView === 'panoramas' && <PanoramasLayout />}
			{activeView === 'editor' && <EditorLayout />}
			{activeView === 'articles' && <ArticleLayout />}
			{activeView === 'photos' && <PhotosLayout />}
		</div>
	)
}

export default Layout
