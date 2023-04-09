import React, { useEffect, useRef } from 'react'

/* Create a panorama view from the state */
const Preview = ({ state, container }) => {
	const viewerRef = useRef<PannellumViewer | null>(null)

	useEffect(() => {
		console.log('mounting preview')

		if (!window.pannellum) {
			throw new Error('Pannellum not loaded')
		}

		/* create a new instance of pannellum viewer */
		viewerRef.current = window.pannellum.viewer(container, state)

		return () => {
			console.log('unmounting preview')

			viewerRef.current?.destroy()
		}
	}, [state])

	return <div id={container} className="aspect-video max-h-full"></div>
}

export default Preview
