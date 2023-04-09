import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setEditorOrientation } from '../../store'

/* Create a panorama view from the state */
const Preview = ({ state, container }) => {
	const viewerRef = useRef<PannellumViewer | null>(null)
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('mounting preview')

		if (!window.pannellum) {
			throw new Error('Pannellum not loaded')
		}

		viewerRef.current = window.pannellum.viewer(container, state)

		/* store orientation when done rotating */
		viewerRef.current?.on('animatefinished', (data) => {
			const yaw = viewerRef.current?.getYaw() || 0
			const pitch = viewerRef.current?.getPitch() || 0

			const payload = {
				yaw: Number.parseFloat(yaw.toFixed(2)),
				pitch: Number.parseFloat(pitch.toFixed(2))
			}

			dispatch(setEditorOrientation(payload))
		})

		/*
		 * cleanup
		 */
		return () => {
			console.log('unmounting preview')
			viewerRef.current?.destroy()
		}
	}, [state.panorama])

	/* returned element */
	return <div id={container} className="aspect-video max-h-full"></div>
}

export default Preview
