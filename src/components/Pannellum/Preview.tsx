import React, { useEffect, useRef } from 'react'

const Preview = ({ state }) => {
	const viewerRef = useRef<PannellumViewer | null>(null)

	useEffect(() => {
		console.log('mounting preview')

		if (!window.pannellum) return console.log('pannellum not loaded')

		/* create a new instance of pannellum viewer */
		viewerRef.current = window.pannellum.viewer('preview', state)

		return () => {
			console.log('unmounting preview')

			viewerRef.current?.destroy()
		}
	}, [state])

	return (
		<div id="preview" className="aspect-video">
			Preview
		</div>
	)
}

export default Preview
