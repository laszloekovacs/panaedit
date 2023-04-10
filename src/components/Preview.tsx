import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setEditorOrientation } from '../../store'
import _ from 'lodash'

/* Create a panorama view from the state */
const Preview = ({ state, container }) => {
	const dispatch = useDispatch()
	const viewerRef = useRef<PannellumViewer | null>(null)

	useEffect(() => {
		console.log('mounting preview')

		if (!window.pannellum) {
			throw new Error('Pannellum not loaded')
		}

		/*
		 * warning: panellum mutates its inputs, give it a copy
		 */
		const stateCopy = _.cloneDeep(state)
		viewerRef.current = window.pannellum.viewer(container, stateCopy)

		/*
		 * cleanup
		 */
		return () => {
			console.log('unmounting preview')
			viewerRef.current?.destroy()
		}
	}, [state.panorama, state.hotSpots])

	/* returned element */
	return <div id={container} className="aspect-video max-h-full"></div>
}

export default Preview
