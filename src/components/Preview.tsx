import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setEditorOrientation } from '../store'
import _ from 'lodash'

/* Create a panorama view from the state */
const Preview = ({ state, container }) => {
	const dispatch = useDispatch()
	const viewerRef = useRef<PannellumViewer | null>(null)

	useEffect(() => {
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
			viewerRef.current?.destroy()
		}
	}, [state.panorama, state.hotSpots])

	/* returned element */
	return <div className="w-full border-2 border-neutral-700" id={container}></div>
}

export default Preview
