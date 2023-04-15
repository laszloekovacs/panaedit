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

	// Todo: add pictures and articles to hotspots
	//const options = ['panoramas', 'editor', 'articles', 'photos']
	const options = ['panoramas', 'editor']

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
		</div>
	)
}

export default Layout
