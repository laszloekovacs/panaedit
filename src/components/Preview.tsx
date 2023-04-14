import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setEditorOrientation } from '../store'
import _ from 'lodash'
import { useEditor } from '../hooks/useEditor'

/* Create a panorama view from the state */
const Preview = ({ state, container }) => {
	const dispatch = useDispatch()
	const { editor } = useEditor()
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
		//viewerRef.current
		/*
		 * notify the editor of the current orientation
		 */
		viewerRef.current?.on('animatefinished', () => {
			// trim to 2 decimals
			const yaw = parseFloat(
				(viewerRef.current?.getYaw() || 0).toFixed(2)
			)
			const pitch = parseFloat(
				(viewerRef.current?.getPitch() || 0).toFixed(2)
			)

			dispatch(setEditorOrientation({ yaw, pitch }))
		})

		/*
		 * cleanup
		 */
		return () => {
			viewerRef.current?.destroy()
		}
	}, [state])

	/* returned element */
	return (
		<div
			className="w-full border-2 border-neutral-700"
			id={container}
		></div>
	)
}

export default Preview
